'use strict'

/* File for Adding Custom script related to Loqate */

/**
 * Clears any active shipping exclusion state from a previous address attempt.
 * When a user selects a new address via Loqate autocomplete, any stale exclusion
 * error (e.g. Alaska shipping restriction) must be reset so the form can proceed.
 */
function clearShippingExclusionState() {
    if ($('body').data('shippingExclusionActive')) {
        $('.shipping-error').empty();
        $('.shipping-method-list').empty();
        $('body').data('shippingExclusionActive', false);
    }
}

pca.on("load", function(type, id, control) {
    control.listen("populate", function(address) {
        clearShippingExclusionState();
        $('#State, #shippingStatedefault').trigger('change');
        let city = $('#AddressCity, #shippingAddressCitydefault');
        let zipcode = $('#ZipCode, #shippingZipCodedefault, #shippingZipCode');
        let address2 = $('#AddressTwo, #shippingAddressTwodefault');
        if (city && city.val()) {
            city.trigger('click');
            city.trigger('blur');
        }
        if (zipcode && zipcode.val()) {
            zipcode.trigger('click');
            zipcode.trigger('change');
            zipcode.trigger('blur');
        }
        if (address2 && address2.val()) {
            address2.trigger('click');
            address2.trigger('blur');
        }
        /* $('.sn-custom-select.State, sn-custom-select.shippingState, sn-custom-select.shippingCountry').select2({
            width: '100%',
            minimumResultsForSearch: Infinity
        }).trigger('change'); */
    });

    if (type === 'capture+') {
        var rawLang = document.documentElement.lang || 'en';
        var lang = rawLang.slice(0, 2).toLowerCase();

        window.pca.messages[lang] = window.loqateMsgs[lang]

        control.language = lang;
    }
});
