/**
 * Cloudinary Page Designer video initialisation.
 *
 * Every registered player is resolved through three gates before a single video byte is requested.
 * The <video> elements are rendered without a src, so nothing is fetched until source() is called
 * below — which makes this the only correct place to decide what to download.
 *
 *   1. BREAKPOINT  Components that author separate desktop and mobile assets tag each view model
 *                  with the media query it belongs to. Only the matching one is ever sourced, so
 *                  the off-breakpoint asset costs zero bytes. Previously both were sourced and one
 *                  was hidden with CSS, which downloads in full — display:none does not cancel a
 *                  media fetch.
 *
 *   2. DIMENSION   Cloudinary delivers the master unless a width is requested. The pinned player
 *                  (2.3.3) has no `breakpoints` option — that arrived in 3.8.0 — so the cap is
 *                  applied here by measuring the rendered slot and appending a c_limit component
 *                  to the source transformation.
 *
 *   3. VIEWPORT    Below-the-fold players defer sourcing until they approach the viewport.
 *                  Anything already on screen (heroes, LCP content) initialises immediately.
 *
 * Re-evaluated on breakpoint change so rotating a device initialises the newly matching player.
 */
(function () {
    'use strict';

    // Round the measured slot up to the next 100px. This is what the player itself does for
    // posters in 2.3.3, and it bounds the number of distinct derivatives (and CDN cache keys)
    // without the waste of a coarse ladder: Cloudinary's own `breakpoints` renditions round a
    // 1425px slot all the way up to 2560, which costs more than the master-capped width it
    // replaces.
    var WIDTH_STEP = 100;

    // Serve retina. A 1x cap saves the most bandwidth but delivers a 393px-wide source into a
    // 393pt slot on a 3x phone, which is a third of the device pixels and visibly soft on a hero.
    // Measured across five PDP heroes, 2x costs +3.5 MiB total *at play time only* - page load is
    // unaffected, since nothing is fetched until the shopper presses play. 3x was not chosen: it
    // costs a further 2.3 MiB for detail past what the eye resolves on moving, muted footage, and
    // `c_limit` already caps every request at the authored master.
    var MAX_DPR = 2;

    // Start fetching a little before the player scrolls into view so playback is not visibly late.
    var ROOT_MARGIN = '200px 0px';

    // `.slick-carousel-inner` is in the server markup, so it exists before slick runs.
    var CAROUSEL_SELECTOR = '.slick-carousel-inner';
    var SLIDE_SELECTOR = '.slick-slide';

    // Gate attached vs player built: carousel players are gated early, built on activation.
    var observed = Object.create(null);
    var created = Object.create(null);

    /**
     * Does this player's authored breakpoint match the current viewport?
     * Players with no media tag serve every viewport.
     *
     * @param {Object} player registered view model
     * @returns {boolean} true when this player should be initialised
     */
    function matchesBreakpoint(player) {
        if (!player.media || typeof window.matchMedia !== 'function') {
            return true;
        }
        return window.matchMedia(player.media).matches;
    }

    /**
     * The element whose width is the box the video renders into. Never the <video> itself: an
     * unstyled one reports the spec's 300x150 default, which pinned a 1425px hero to w_300.
     *
     * @param {HTMLElement} el the video element
     * @returns {HTMLElement|null} the slot element, or null when none has a width
     */
    function slotOf(el) {
        var node = el.parentElement;
        while (node) {
            if (node.clientWidth > 0) {
                return node;
            }
            node = node.parentElement;
        }
        return null;
    }

    /**
     * The capped width a slot currently calls for, rounded to the step.
     *
     * @param {HTMLElement|null} slot the measured slot element
     * @returns {number} the width to request, or 0 when the slot cannot be measured
     */
    function bucketWidthFor(slot) {
        var slotWidth = slot ? slot.clientWidth : (window.innerWidth || 0);
        if (!slotWidth) {
            return 0;
        }
        var dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        return Math.ceil((slotWidth * dpr) / WIDTH_STEP) * WIDTH_STEP;
    }

    /**
     * Append a c_limit width so Cloudinary stops shipping the master. Appending rather than
     * replacing keeps the global quality/format components the site preferences produced.
     *
     * @param {Object} sourceConfig the player source configuration, mutated in place
     * @param {number} width the capped width to request
     */
    function applyCap(sourceConfig, width) {
        if (!Array.isArray(sourceConfig.transformation)) {
            // eslint-disable-next-line no-param-reassign
            sourceConfig.transformation = [];
        }
        sourceConfig.transformation.push({ width: width, crop: 'limit' });
    }

    /**
     * The <video> video.js is currently using. It rebuilds this node on every source change, so
     * the element createPlayer was handed is detached and must never be reused.
     *
     * @param {Object} p the built Cloudinary player
     * @returns {HTMLElement|null} the live tech element
     */
    function liveTech(p) {
        var root = p.videojs && typeof p.videojs.el === 'function' ? p.videojs.el() : null;
        return root ? root.querySelector('video') : null;
    }

    /**
     * Has CSS committed this element to a ratio? `auto` and `auto 16 / 9` defer to intrinsic; a
     * bare `16 / 9` is deliberate. The wrapper counts: video.js moves authored classes onto it.
     *
     * @param {HTMLElement|null} el the element to test
     * @returns {boolean} true when a bare ratio is committed
     */
    function committedRatio(el) {
        var declared = el ? window.getComputedStyle(el).aspectRatio : '';
        return !!declared && declared !== 'auto' && declared.indexOf('auto') !== 0;
    }

    /**
     * Reserve the box from the poster — a decoded `f_jpg` frame, so correct even when recorded
     * dimensions are wrong. Skipped for components that committed to their own box (SC-16341).
     *
     * @param {Object} p the built Cloudinary player
     * @param {Object} playerConfig the resolved player configuration
     */
    function reserveFromPoster(p, playerConfig) {
        var vjs = p.videojs;
        var conf = playerConfig || {};
        if (typeof window.getComputedStyle !== 'function' || !vjs
            || typeof vjs.ready !== 'function' || typeof vjs.aspectRatio !== 'function'
            || typeof vjs.poster !== 'function' || conf.fluid === false || conf.aspectRatio) {
            return;
        }

        var apply = function () {
            var poster = vjs.poster();
            if (!poster) {
                return;
            }

            var tech = liveTech(p);
            if (committedRatio(tech) || committedRatio(vjs.el())) {
                return;
            }

            var img = new window.Image();
            img.onload = function () {
                if (!img.naturalWidth || !img.naturalHeight || vjs.videoWidth()) {
                    return;
                }
                vjs.aspectRatio(img.naturalWidth + ':' + img.naturalHeight);

                // The poster is only a stand-in; decoded dimensions win once they arrive. On the
                // player, not the element: a re-cap rebuilds the tech and would strand a listener.
                vjs.one('loadedmetadata', function () {
                    if (vjs.videoWidth() > 0 && vjs.videoHeight() > 0) {
                        vjs.aspectRatio(vjs.videoWidth() + ':' + vjs.videoHeight());
                    }
                });
            };
            img.src = poster;
        };

        vjs.ready(function () {
            if (vjs.poster()) {
                apply();
            } else {
                vjs.one('posterchange', apply);
            }
        });
    }

    /**
     * Build the player and request its source. This is the point bytes start flowing.
     *
     * @param {Object} player registered view model
     * @param {HTMLElement} el the video element
     */
    function createPlayer(player, el) {
        var conf = { cloud_name: player.cloudName };
        if (player.cname) {
            conf.secure_distribution = player.cname;
            conf.private_cdn = true;
        }

        var cld = window.cldPDVideoPlayer.Cloudinary.new(conf);
        var pCnf = JSON.parse(player.widgetOptions);

        var width = bucketWidthFor(slotOf(el));
        if (width) {
            applyCap(pCnf.sourceConfig, width);
        }

        var p = cld.videoPlayer(player.id, pCnf.playerConfig);
        p.source(player.public_id, pCnf.sourceConfig);
        reserveFromPoster(p, pCnf.playerConfig);
        p.on('error', function (e) {
            var error = e.Player.videojs.error();
            if (error && error.code === 10) {
                p.videojs.error(null);
                p.videojs.error({ code: null, message: 'Generating the video, please wait.' });
            }
        });
    }

    /**
     * The carousel a player sits in, if any.
     *
     * @param {HTMLElement} el the video element
     * @returns {HTMLElement|null} the carousel root, or null outside one
     */
    function carouselOf(el) {
        return typeof el.closest === 'function' ? el.closest(CAROUSEL_SELECTOR) : null;
    }

    /**
     * Build a player once, whichever trigger got there first.
     *
     * @param {Object} player registered view model
     * @param {HTMLElement} el the video element
     */
    function createOnce(player, el) {
        if (created[player.id]) {
            return;
        }
        created[player.id] = true;
        try {
            createPlayer(player, el);
        } catch (e) {
            console.error('Cloudinary player failed to initialize for', player.id, e);
        }
    }

    /**
     * The registered view model behind a DOM id, at the current breakpoint. Components register
     * the same player once per rendered instance, so the first eligible match is the right one.
     *
     * @param {string} id the element id
     * @returns {Object|null} the view model, or null when none is eligible
     */
    function playerFor(id) {
        var list = Array.isArray(window.players) ? window.players : [];
        for (var n = 0; n < list.length; n++) {
            if (list[n] && list[n].id === id && list[n].widgetOptions && list[n].cloudName
                && matchesBreakpoint(list[n])) {
                return list[n];
            }
        }
        return null;
    }

    /**
     * The authored slide a clone was copied from. slick indexes clones outside the authored
     * range, so the original is that index modulo the authored slide count.
     *
     * @param {HTMLElement} carousel the carousel root
     * @param {HTMLElement} cloneSlide the cloned slide
     * @returns {HTMLElement|null} the authored slide, or null when it cannot be resolved
     */
    function originalSlideFor(carousel, cloneSlide) {
        var originals = carousel.querySelectorAll(SLIDE_SELECTOR + ':not(.slick-cloned)');
        var raw = parseInt(cloneSlide.getAttribute('data-slick-index'), 10);
        if (!originals.length || Number.isNaN(raw)) {
            return null;
        }

        var index = ((raw % originals.length) + originals.length) % originals.length;
        for (var n = 0; n < originals.length; n++) {
            if (parseInt(originals[n].getAttribute('data-slick-index'), 10) === index) {
                return originals[n];
            }
        }
        return null;
    }

    /**
     * Give an active clone the source its original resolved to. slick blanks every id inside
     * `.slick-cloned`, so a clone cannot be handed to the player; mirroring plays it natively,
     * which is equivalent for these muted, looping, controls-disabled players.
     *
     * @param {HTMLElement} cloneSlide the active cloned slide
     * @param {HTMLElement} carousel the carousel root
     * @param {HTMLElement} [cloneVideo] the clone video to mirror; defaults to the slide's first
     */
    function mirrorIntoClone(cloneSlide, carousel, cloneVideo) {
        var clone = cloneVideo || cloneSlide.querySelector('video');
        if (!clone || clone.getAttribute('src')) {
            return;
        }

        // Pair by position: a slide can hold a desktop and a mobile asset, and slick blanks the
        // id on both, so the clone's Nth video mirrors the original's Nth.
        var index = [].indexOf.call(cloneSlide.querySelectorAll('video'), clone);
        var original = originalSlideFor(carousel, cloneSlide);
        var source = original ? original.querySelectorAll('video')[index] : null;
        if (!source) {
            return;
        }

        if (source.id) {
            var player = playerFor(source.id);
            if (player) {
                createOnce(player, source);
            }
        }

        // The src lands on .vjs-tech once the player has resolved the URL. Bounded poll.
        var attempts = 0;
        var timer = window.setInterval(function () {
            attempts += 1;

            var tech = source.id
                ? document.getElementById(source.id + '_html5_api')
                : original.querySelectorAll('.vjs-tech')[index];
            var src = tech ? tech.getAttribute('src') : null;
            if (!src) {
                if (attempts >= 30) {
                    window.clearInterval(timer);
                }
                return;
            }
            window.clearInterval(timer);

            var poster = tech.getAttribute('poster');
            if (poster) {
                clone.setAttribute('poster', poster);
            }
            clone.setAttribute('playsinline', '');
            clone.setAttribute('loop', '');
            clone.muted = true;
            clone.setAttribute('src', src);

            var started = clone.play();
            if (started && typeof started.catch === 'function') {
                started.catch(function () { return null; });
            }
        }, 100);
    }

    /**
     * Initialise only the slide on screen. Sourcing a player fetches its video even with
     * `preload: "none"`, because the authored config sets `autoplay: true`.
     *
     * @param {HTMLElement} carousel the carousel root
     */
    function initialiseActiveSlide(carousel) {
        var active = carousel.querySelectorAll(SLIDE_SELECTOR + '.slick-active');
        for (var n = 0; n < active.length; n++) {
            // A slide can hold a desktop and a mobile asset; only the matching one is built.
            // Videos inside a nested carousel are left to that carousel's own gating.
            var videos = active[n].querySelectorAll('video');
            for (var v = 0; v < videos.length; v++) {
                var video = videos[v];
                if (carouselOf(video) !== carousel) {
                    continue;
                }
                if (video.id) {
                    var player = playerFor(video.id);
                    if (player) {
                        createOnce(player, video);
                    }
                } else {
                    mirrorIntoClone(active[n], carousel, video);
                }
            }
        }
    }

    /**
     * Follow slick's lifecycle so the slide that becomes visible gets its player. `setPosition`
     * is avoided: it fires on every resize.
     *
     * @param {HTMLElement} carousel the carousel root
     */
    function bindCarousel(carousel) {
        if (carousel.getAttribute('data-cld-slide-gate') === 'on'
            || typeof window.jQuery !== 'function') {
            return;
        }
        carousel.setAttribute('data-cld-slide-gate', 'on');
        window.jQuery(carousel).on('init.cldVideo reInit.cldVideo afterChange.cldVideo', function () {
            initialiseActiveSlide(carousel);
        });
    }

    /**
     * Attach the viewport gate for one registered player and let the trigger decide.
     * Per-player try/catch so one bad configuration cannot abort the rest.
     *
     * @param {Object} player registered view model
     */
    function initializePlayer(player) {
        try {
            if (!player || !player.widgetOptions || !player.cloudName) {
                return;
            }
            if (created[player.id] || observed[player.id] || !matchesBreakpoint(player)) {
                return;
            }

            var el = document.getElementById(player.id);
            if (!el) {
                return;
            }

            if (typeof window.IntersectionObserver !== 'function') {
                createOnce(player, el);
                return;
            }

            var carousel = carouselOf(el);
            observed[player.id] = true;

            var observer = new window.IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) {
                        return;
                    }
                    observer.disconnect();

                    if (!carousel) {
                        createOnce(player, el);
                        return;
                    }

                    bindCarousel(carousel);

                    if (carousel.classList.contains('slick-initialized')) {
                        initialiseActiveSlide(carousel);
                    } else {
                        // No carousel behaviour: the tiles are in flow and all of them show.
                        createOnce(player, el);
                    }
                });
            }, { rootMargin: ROOT_MARGIN });

            // Observe the carousel, not slide content: .slick-list is overflow:hidden, so a
            // parked slide's intersection rect is clipped to 0x0 and never intersects.
            observer.observe(carousel || el);
        } catch (e) {
            console.error('Cloudinary player failed to initialize for', player && player.id, e);
        }
    }

    /**
     * Initialise every registered player that currently matches.
     */
    function initializeCloudinaryPlayers() {
        if (!Array.isArray(window.players)) {
            return;
        }
        window.players.forEach(initializePlayer);
    }

    /**
     * Re-run the gates when the viewport crosses an authored breakpoint, so rotating a device or
     * resizing a window initialises the player that has just become the matching one.
     */
    function watchBreakpoints() {
        if (typeof window.matchMedia !== 'function' || !Array.isArray(window.players)) {
            return;
        }

        var seen = Object.create(null);
        window.players.forEach(function (player) {
            if (!player || !player.media || seen[player.media]) {
                return;
            }
            seen[player.media] = true;

            var mql = window.matchMedia(player.media);
            if (typeof mql.addEventListener === 'function') {
                mql.addEventListener('change', initializeCloudinaryPlayers);
            } else if (typeof mql.addListener === 'function') {
                mql.addListener(initializeCloudinaryPlayers); // Safari < 14
            }
        });
    }

    /**
     * The player bundle is loaded by a separate tag that may not have executed yet.
     */
    function whenPlayerReady(callback) {
        if (window.cldPDVideoPlayer) {
            callback();
            return;
        }
        var waited = 0;
        var timer = window.setInterval(function () {
            waited += 50;
            if (window.cldPDVideoPlayer) {
                window.clearInterval(timer);
                callback();
            } else if (waited >= 10000) {
                window.clearInterval(timer);
                console.error('Cloudinary video player bundle did not load; no videos initialised.');
            }
        }, 50);
    }

    whenPlayerReady(function () {
        initializeCloudinaryPlayers();
        watchBreakpoints();
    });

    // Preserved for components that register players after this script runs.
    window.initializeCloudinaryPlayers = initializeCloudinaryPlayers;
}());
