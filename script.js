const grid = document.querySelector("#wishlist-grid");
const emptyState = document.querySelector("#empty-state");
const itemCount = document.querySelector("#item-count");
const priceSort = document.querySelector("#price-sort");
const year = document.querySelector("#year");
const snowfall = document.querySelector(".snowfall");

function createSnowfall() {
  if (!snowfall || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const flakes = document.createDocumentFragment();

  for (let index = 0; index < 42; index += 1) {
    const flake = document.createElement("i");
    flake.style.setProperty("--x", `${Math.random() * 100}vw`);
    flake.style.setProperty("--drift", `${Math.random() * 120 - 60}px`);
    flake.style.setProperty("--size", `${Math.random() * 5 + 3}px`);
    flake.style.setProperty("--duration", `${Math.random() * 8 + 9}s`);
    flake.style.setProperty("--delay", `${Math.random() * -17}s`);
    flake.style.setProperty("--opacity", `${Math.random() * 0.45 + 0.35}`);
    flakes.append(flake);
  }

  snowfall.append(flakes);
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

function createWishlistCard(item, index) {
  const article = document.createElement("article");
  article.className = "wish-card";

  const link = document.createElement("a");
  link.className = "card-link";
  link.href = item.link;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", `View where to buy ${item.title}`);

  const imageWrap = document.createElement("div");
  imageWrap.className = "image-wrap";

  const image = document.createElement("img");
  image.src = item.image;
  image.alt = item.title;
  image.loading = index < 3 ? "eager" : "lazy";
  image.addEventListener("error", () => {
    imageWrap.classList.add("image-error");
    image.remove();
  });

  const arrow = document.createElement("span");
  arrow.className = "card-arrow";
  arrow.setAttribute("aria-hidden", "true");

  const arrowMark = document.createElement("i");
  arrowMark.className = "css-arrow";
  arrow.append(arrowMark);

  const content = document.createElement("div");
  content.className = "card-content";

  const label = document.createElement("p");
  label.className = "card-label";
  label.textContent = `Wish ${String(index + 1).padStart(2, "0")}`;

  const title = document.createElement("h3");
  title.textContent = item.title;

  const price = document.createElement("p");
  price.className = "card-price";
  price.textContent = Number.isFinite(Number(item.price))
    ? currencyFormatter.format(Number(item.price))
    : "Price not listed";

  const ratingValue = Math.round(Number(item.rating));
  const hasRating = Number.isFinite(ratingValue) && ratingValue >= 1 && ratingValue <= 5;

  let rating;
  if (hasRating) {
    rating = document.createElement("div");
    rating.className = "card-rating";
    rating.setAttribute("role", "img");
    rating.setAttribute("aria-label", `${ratingValue} out of 5 priority rating`);

    for (let starNumber = 1; starNumber <= 5; starNumber += 1) {
      const star = document.createElement("span");
      star.className = starNumber <= ratingValue ? "rating-star is-filled" : "rating-star";
      star.setAttribute("aria-hidden", "true");
      rating.append(star);
    }
  }

  imageWrap.append(image, arrow);
  content.append(label, title, price);

  if (rating) {
    content.append(rating);
  }

  if (item.note) {
    const note = document.createElement("p");
    note.className = "card-note";
    note.textContent = item.note;
    content.append(note);
  }

  const shopText = document.createElement("span");
  shopText.className = "shop-text";
  shopText.textContent = "View item";
  content.append(shopText);

  link.append(imageWrap, content);
  article.append(link);
  return article;
}

function getSortedItems(sortOrder) {
  const items = wishlistItems.map((item, originalIndex) => ({ item, originalIndex }));

  if (sortOrder === "low-high") {
    return items.sort((a, b) => Number(a.item.price) - Number(b.item.price));
  }

  if (sortOrder === "high-low") {
    return items.sort((a, b) => Number(b.item.price) - Number(a.item.price));
  }

  return items;
}

function renderWishlist(sortOrder = "default") {
  grid.replaceChildren();

  if (!Array.isArray(wishlistItems) || wishlistItems.length === 0) {
    emptyState.hidden = false;
    itemCount.textContent = "No wishes yet";
    return;
  }

  const fragment = document.createDocumentFragment();
  getSortedItems(sortOrder).forEach(({ item, originalIndex }) => {
    fragment.append(createWishlistCard(item, originalIndex));
  });

  grid.append(fragment);
  itemCount.textContent = `${wishlistItems.length} ${wishlistItems.length === 1 ? "wish" : "wishes"}`;
}

year.textContent = new Date().getFullYear();
createSnowfall();
renderWishlist();

priceSort.addEventListener("change", (event) => {
  renderWishlist(event.target.value);
});
