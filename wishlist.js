/*
  EDIT YOUR WISHLIST HERE

  To add an item:
  1. Copy one complete item between { and }.
  2. Paste it after another item, separated by a comma.
  3. Change the title, image, link, price, rating, and optional note.

  Ratings are optional. Use a whole number from 1 to 5.
  Delete the rating line if you do not want stars on an item.

  To remove an item, delete its complete { ... } block.

  Image tips:
  - Put your images in the "images" folder and use: "images/your-photo.jpg"
  - Or paste a full image URL beginning with https://
*/

const wishlistItems = [
  {
    title: "Surprise Me!",
    image: "images/mystery.png",
    link: "",
    price: 0.00,
    rating: 2,
    note: "In case nothing else here works, I will be happy with a surprise gift!",
  },
  {
    title: "Calico Critters",
    image: "images/ccbiscuitbears.webp",
    link: "https://store.calicocritters.com/families/",
    price: 30.00,
    rating: 4,
    note: "Any Calico Critter family set or babies",
  },
  {
    title: "Laundry Turtle",
    image: "images/bluelt.webp",
    link: "https://laundryturtle.com/products/laundry-turtle?variant=45152096944297",
    price: 30.00,
    rating: 4,
    note: "To keep my clothes from falling in cat litter!!!",
  },
  {
    title: "Shark Air Purifier",
    image: "images/air.avif",
    link: "https://www.sharkninja.com/shark-neverchange-air-purifier/HP152.html",
    price: 249.99,
    rating: 4,
    note: "The bunny hair can be a bit much and the litter can get stiky",
  },
  {
    title: "Squish-a-longs",
    image: "images/squish.jpg",
    link: "https://a.co/d/0gCkafLx",
    price: 13.00,
    rating: 2,
    note: "They're cute",
  },
  {
    title: "Jellycat",
    image: "images/jellycat.jpg",
    link: "https://us.jellycat.com/amuseables-bouquet-of-flowers/?_gl=1*7bkwjz*_up*MQ..*_gs*MQ..&gclid=CjwKCAjw0fbWBhBkEiwAwJuQ8Xbc8bQRHXOl3IVNTZ3Bx1y-p7HzkqxK8ZY2SvILdVxhdptoTz4HeBoC18UQAvD_BwE&gbraid=0AAAAADtxRQAyi9o7lV89y6H2aksUjY7GO",
    price: 55.00,
    rating: 3,
    note: "Also cute",
  },
  {
    title: "Winter Boots",
    image: "images/boot.jpeg",
    link: "https://www.sorel.com/p/tivoli-v-tall-womens-winter-boot-2082951.html?dwvar_2082951_size=9&dwvar_2082951_color=242",
    price: 190.00,
    rating: 5,
    note: "I don't have any real winter boots that can compete with MN weather. I'm a size 9",
  },
  {
    title: "T-shirt",
    image: "images/shirt1.jpg",
    link: "https://www.amazon.com/Vintage-Oversized-Streetwear-Boyfriend-W-BKAGBG/dp/B0DF2WP8FD/ref=sxin_12_pa_sp_search_thematic_sspa?content-id=amzn1.sym.4c1fec13-dc0d-410e-8849-50e4ac9139df%3Aamzn1.sym.4c1fec13-dc0d-410e-8849-50e4ac9139df&crid=NT79PS52YSBX&cv_ct_cx=womens%2Bgraphic%2Bt%2Bshirts&keywords=womens%2Bgraphic%2Bt%2Bshirts&pd_rd_i=B0DF2VDQPR&pd_rd_r=536749a7-1d90-47c3-b998-7b0f9ae2c889&pd_rd_w=gl4af&pd_rd_wg=gerXc&pf_rd_p=4c1fec13-dc0d-410e-8849-50e4ac9139df&pf_rd_r=50SHETM2KH6V133KK9SV&qid=1792967937&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=womens%2Bgraphic%2B%2Caps%2C250&sr=1-1-73628ac3-efbc-4ed0-91a3-3f4336118b5f-spons&aref=3vctGWQuqU&sp_csd=d2lkZ2V0TmFtZT1zcF9zZWFyY2hfdGhlbWF0aWM&th=1&psc=1",
    price: 26.00,
    rating: 3,
    note: "size small",
  },
  {
    title: "T-shirt",
    image: "images/shirt2.webp",
    link: "https://www.pacsun.com/riot-society/snoopy-kanji-t-shirt-0097448870008.html?dwvar_0097448870008_color=001&tileCgid=mens-graphic-tees",
    price: 28.00,
    rating: 3,
    note: "size small",
  },
  {
    title: "T-shirt",
    image: "images/shirt3.jpg",
    link: "https://www.pacsun.com/keith-haring-world-hug-t-shirt-0097432810006.html?dwvar_0097432810006_color=010&tileCgid=mens-graphic-tees",
    price: 38.00,
    rating: 3,
    note: "size small",
  },
  {
    title: "Miffy ceramic",
    image: "images/miffyflower.webp",
    link: "https://www.urbanoutfitters.com/shop/miffy-daisy-ceramic-figurine?color=000&size=ALL&type=STANDARD&srsltid=AU7gw4U4DKZvb569kXlIsIjNAe94GfhJufQG-BV7cuFQfduCvDPMomR2cTw",
    price: 25.00,
    rating: 4,
    note: "",
  },
  {
    title: "Miffy Clock",
    image: "images/miffyclock.webp",
    link: "https://www.urbanoutfitters.com/shop/miffy-cuckoo-wall-clock?color=072&searchparams=q%3Dmiffy",
    price: 50.00,
    rating: 4,
    note: "",
  },
  {
    title: "Bunny Dig Box",
    image: "images/bunnybox.jpg",
    link: "https://shop.vivapets.com/us/trixie-wood-burrowing-box-for-rabbits?gad_source=4&gad_campaignid=18315392044&gbraid=0AAAAAC_uMUsnmRnrTeIXjMSCaoYKVXmCO&gclid=CjwKCAjw0fbWBhBkEiwAwJuQ8Wrt0LW4QFz0O53GKn09DZwbBP6FuaD89Swv0kZ0lVvZ_yU_Ri3W1xoC5K4QAvD_BwE",
    price: 75.00,
    rating: 5,
    note: "The bunnies love to dig",
  },
  {
    title: "Rabbit Toys",
    image: "images/oxbow.svg",
    link: "https://oxbowanimalhealth.com/our-products/enrichment/?_species=rabbits",
    price: 10.00,
    rating: 4,
    note: "The bunnies get bored and need toys",
  },
  {
    title: "Guinea Pig Toys",
    image: "images/oxbow.svg",
    link: "https://oxbowanimalhealth.com/our-products/enrichment/?_species=guinea-pigs",
    price: 10.00,
    rating: 3,
    note: "The guinea pigs also need toys",
  },
  {
    title: "Shark flexstyle",
    image: "sharkhair.avif",
    link: "https://www.sharkninja.com/cart"
    price: 199.00,
    rating: 3,
    note: "",
  },

];
