# Christmas Wishlist

A simple, responsive Christmas wishlist designed for GitHub Pages. It uses plain HTML, CSS, and JavaScript—there is no build step and no dependencies to install.

## Add or remove wishlist items

Open `wishlist.js`. Each item looks like this:

```js
{
  title: "Item name",
  image: "images/item-photo.jpg",
  link: "https://store.example.com/item",
  price: 49.99,
  rating: 5,
  note: "Optional detail, such as color or size.",
},
```

- Add an item by copying that block and changing its values.
- Remove an item by deleting its complete block.
- Put local image files in the `images` folder, or use a full `https://` image URL.
- Enter `price` as a number without a dollar sign. Visitors can sort items by price.
- Enter `rating` as a whole number from `1` to `5`. Delete that line to hide stars for an item.
- Keep a comma between items.

The three included entries are placeholders. Replace them with your own gifts and store links.

## Preview locally

You can open `index.html` directly in a browser, or run a local server from this folder:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Push this repository to GitHub.
2. Open the repository's **Settings** → **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose your main branch and the `/ (root)` folder, then click **Save**.

GitHub will show the public URL when deployment finishes.
