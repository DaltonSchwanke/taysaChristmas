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
    title: "Kitchen Aid Stand Mixer",
    image: "images/mixer.webp",
    link: "https://www.kitchenaid.com/countertop-appliances/stand-mixers/tilt-head-stand-mixers/p.artisan-series-5-quart-tilt-head-stand-mixer.KSM150PSFT.html?_gl=1*1653u73*_up*MQ..*_gs*MQ..&gclid=CjwKCAjw0fbWBhBkEiwAwJuQ8XV4bCIaql1vhg2mxJ1N_1l_DimjBxrViKacGVPL8yd__f2G32WMGhoCzJoQAvD_BwE&gclsrc=aw.ds&gbraid=0AAAAAC5rhmKzH1WrRFuKcdNjtIc-5aWif",
    price: 499.99,
    rating: 5,
    note: "Feather Pink stand mixer. Engrave with a special message if you'd like.",
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
    title: "Roomba",
    image: "images/roomba.webp",
    link: "https://www.irobot.com/en_US/roomba-plus-678-combo-robot-plus-autowash-dock/V185020.html",
    price: 899.99,
    rating: 4,
    note: "In case your feeling very generous",
  },
  {
    title: "Coach Brooklyn Bag",
    image: "images/bag.webp",
    link: "https://www.coach.com/products/brooklyn-shoulder-bag-28/CU068-B4%2FBK.html?COHNA=true&ogmap=PLA|RTN|GOOG|STND|c|SITEWIDE|Retail|Coach_RTL_Google_PLA_Signal_NA_Unified_National_Pmax_NA_BAU|Shopping_Smart_Unified||22170925638||US&utm_source=google&utm_medium=cpc&utm_campaign=Coach_RTL_Google_PLA_Signal_NA_Unified_National_Pmax_NA_BAU_Bags&utm_id=go_cmp-22170925638_adg-_ad-__dev-c_ext-_prd-CU068%20B4%2FBK_sig-CjwKCAjw0fbWBhBkEiwAwJuQ8SdPohjwAaLZpt_8cuuTKce0XXLJkUhxdiQQ97ize5u86gLE2uR2pxoCm6sQAvD_BwE&gclsrc=aw.ds&gad_source=1&gad_campaignid=22181132353&gbraid=0AAAAAD_i1XQtQUjeawwzvAke004q91JyO&gclid=CjwKCAjw0fbWBhBkEiwAwJuQ8SdPohjwAaLZpt_8cuuTKce0XXLJkUhxdiQQ97ize5u86gLE2uR2pxoCm6sQAvD_BwE",
    price: 295.00,
    rating: 3,
    note: "Cute bag",
  },
  {
    title: "Surprise Me!",
    image: "images/mystery.png",
    link: "",
    price: 0.00,
    rating: 2,
    note: "In case nothing else here works, I will be happy with a surprise gift!",
  },
  {
    title: "Surprise Me!",
    image: "images/mystery.png",
    link: "",
    price: 0.00,
    rating: 2,
    note: "In case nothing else here works, I will be happy with a surprise gift!",
  },
  {
    title: "Surprise Me!",
    image: "images/mystery.png",
    link: "",
    price: 0.00,
    rating: 2,
    note: "In case nothing else here works, I will be happy with a surprise gift!",
  },
  {
    title: "Surprise Me!",
    image: "images/mystery.png",
    link: "",
    price: 0.00,
    rating: 2,
    note: "In case nothing else here works, I will be happy with a surprise gift!",
  },
  {
    title: "Surprise Me!",
    image: "images/mystery.png",
    link: "",
    price: 0.00,
    rating: 2,
    note: "In case nothing else here works, I will be happy with a surprise gift!",
  },
  {
    title: "Surprise Me!",
    image: "images/mystery.png",
    link: "",
    price: 0.00,
    rating: 2,
    note: "In case nothing else here works, I will be happy with a surprise gift!",
  },
  {
    title: "Surprise Me!",
    image: "images/mystery.png",
    link: "",
    price: 0.00,
    rating: 2,
    note: "In case nothing else here works, I will be happy with a surprise gift!",
  },
  {
    title: "Surprise Me!",
    image: "images/mystery.png",
    link: "",
    price: 0.00,
    rating: 2,
    note: "In case nothing else here works, I will be happy with a surprise gift!",
  }

];
