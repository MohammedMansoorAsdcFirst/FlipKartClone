let searchUrl = new URLSearchParams(window.location.search);
let id = searchUrl.get("id");

let hamburger = document.querySelector("#hamburger");
let navRight = document.querySelector(".nav-right");
let catgContainer = document.querySelector(".catg-container");
let card = document.querySelector(".items-cart-container");
let relevance = document.querySelector("#links-relevance");
let sortBy = document.querySelector("#sortBy");
let popularity = document.querySelector("#popularity");
let highToLow = document.querySelector("#HighToLow");
let newestFirst = document.querySelector("#newestFirst");
let itemsLocation = document.querySelector(".items-location");
let cartItem = document.querySelector(".cart-items");
let filterLocation = document.querySelector(".filter-location");
let Brand = document.querySelector(".filter-brand");
let mainHeading = document.querySelector("#main-h3")

// console.log(navRight)

let showSate = false;

hamburger.addEventListener("click", function () {
  showSate = !showSate;
  console.log(showSate);
  if (showSate) {
    navRight.setAttribute("id", "show-menu-items");
  } else {
    navRight.setAttribute("id", "");
  }
});

async function fetchAllData() {
  let fetchAllData = await fetch("https://dummyjson.com/products");
  let resAllData = await fetchAllData.json();
  return resAllData;
}

async function fetchApi() {
  let fetchData = await fetch(`https://dummyjson.com/products/category/${id}`);
  let resData = await fetchData.json();
  // console.log(resData.products[0].category)
  // console.log(fetchData)
  return resData;
}

window.onload = async function () {
  catgContainer.innerHTML = `
    <div class="shimmer"></div>
    <div class="shimmer"></div>
    <div class="shimmer"></div>
    <div class="shimmer"></div>
    <div class="shimmer"></div>
    <div class="shimmer"></div>`;

  card.innerHTML = `<div class="items-cart-onload">
    <div class="cart-img-onload"></div>
    <div class="cart-title-onload"></div>
    <div class="cart-price-onload"></div>
    </div><div class="items-cart-onload">
    <div class="cart-img-onload"></div>
    <div class="cart-title-onload"></div>
    <div class="cart-price-onload"></div>
    </div><div class="items-cart-onload">
    <div class="cart-img-onload"></div>
    <div class="cart-title-onload"></div>
    <div class="cart-price-onload"></div>
    </div><div class="items-cart-onload">
    <div class="cart-img-onload"></div>
    <div class="cart-title-onload"></div>
    <div class="cart-price-onload"></div>
    </div><div class="items-cart-onload">
    <div class="cart-img-onload"></div>
    <div class="cart-title-onload"></div>
    <div class="cart-price-onload"></div>
    </div><div class="items-cart-onload">
    <div class="cart-img-onload"></div>
    <div class="cart-title-onload"></div>
    <div class="cart-price-onload"></div>
    </div>`;
  let data = await fetchApi();
  let products = data.products;
  // console.log(products)
  let AllData = await fetchAllData();
  // console.log(AllData.products)
  let allProducts = AllData.products;
  UniqCatg(allProducts);
  displayItems(products);
  dispBrand(products);
};
relevance.classList.add("headingLinks");

if (localStorage.length === 0) {
  cartItem.style.opacity = "0";
} else {
  cartItem.innerHTML = `${localStorage.getItem("count")}`;
}

let capitalId = id.charAt(0).toUpperCase() + id.slice(1);

mainHeading.innerHTML=`Showing 1 – 5 of 30 results for "${capitalId}"`

itemsLocation.innerHTML = `<a href="index.html">Home <svg class="main-heading-arrow"
xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<path
    d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z">
</path>container
</svg></a>
<a href="index.html">All Accessories
<svg class="main-heading-arrow"
xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<path
    d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z">
</path>container
</svg><a href="#">${capitalId}</a></a>`;

async function UniqCatg(products) {
  console.log(products);
  let catg = products.map((e) => {
    return e.category;
  });
  // console.log(catg)

  let uniqCatg = catg.filter((item, index) => {
    return catg.indexOf(item) === index;
  });
  // console.log(uniqCatg)
  let elemCatgs = uniqCatg.map((item) => {
    let capitalizedItem = item.charAt(0).toUpperCase() + item.slice(1);
    let elem = `<div class="catg-item" onclick=dispCatg('${item}')>${capitalizedItem}<svg class="main-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z">
                            </path>
                        </svg></div>`;
    return elem;
  });

  catgContainer.innerHTML = elemCatgs.join("");
}

function displayItems(products) {
  // console.log(products[0])
  let items = products.map((item) => {
    let elemItem = `<a href="details.html?id=${
      item.id
    }"><div class="items-cart">
            <div class="cart-img">
                <img src="${item.thumbnail}"
                    alt="">
            <div class="cart-compare">
                <input type="checkbox" id="addtocompare">
                <label>Add to Compare</label>
            </div>
        </div>
        <div class="cart-title">
        <a href="details.html?id=${item.id}">${item.title}</a>
        <br>
        <div class="cart-title-content">
            <div class="cart-rating">
             ${item.rating} &#9733;
            </div>
            <div class="cart-stock">
             &nbsp; ${item.stock} Items are left in stock
         </div>
        </div>
            <div class="cart-des">
                <ul>
                 <li>&#9679; ${item.description}<li>
                </ul>
         </div>
        </div>
     <div class="cart-price-container">
            <div class="cart-price">
             &#36 ${
               item.price
             }/-&nbsp;&nbsp;<img class="cart-assured-img" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="">
            </div>
            <div class="cart-btn-price">
                <div class="actualAmt">
                 &#36; ${actualAmtCalc(item)}
             </div>
             <div class="disPer">
                   ${item.discountPercentage.toFixed(0)}%off
             </div>
            </div>
        </div>
    </div></a>`;
    // actualAmtCalc(item)
    function actualAmtCalc(item) {
      let actualAmt = (item.price * item.discountPercentage) / 100;
      let totalAmt = actualAmt + item.price;
      // console.log(totalAmt.toFixed(0))
      return totalAmt.toFixed(0);
    }
    return elemItem;
  });
  card.innerHTML = items.join("");
}

function dispCatg(id) {
  // console.log(id)
  window.location.href = `catg.html?id=${id}`;
}

let searchInp = document.querySelector("#search");
searchInp.addEventListener("keyup", async function (e) {
  // console.log(e)
  let inputVal = e.target.value;
  let data = await fetchApi();
  let products = data.products;

  // console.log(title)
  let searchData = products.filter(function (e) {
    let title = e.title.toLowerCase();
    return title.includes(inputVal);
  });
  // console.log(searchData)
  displayItems(searchData);
});

relevance.addEventListener("click", () => {
  addStyleToLinks();
  relevance.classList.add("headingLinks");
});

popularity.addEventListener("click", () => {
  addStyleToLinks();
  popularity.classList.add("headingLinks");
});

lowToHigh.addEventListener("click", () => {
  addStyleToLinks();
  lowToHigh.classList.add("headingLinks");
});

highToLow.addEventListener("click", () => {
  addStyleToLinks();
  highToLow.classList.add("headingLinks");
});

newestFirst.addEventListener("click", () => {
  addStyleToLinks();
  newestFirst.classList.add("headingLinks");
});

function addStyleToLinks() {
  let allLinks = [
    sortBy,
    relevance,
    popularity,
    lowToHigh,
    highToLow,
    newestFirst,
  ];
  allLinks.forEach((link) => {
    link.classList.remove("headingLinks");
  });
}

cartItem.innerHTML = `${localStorage.getItem("count")}`;

filterLocation.innerHTML = `<a href="#"> ${id} <svg class="main-heading-arrow cate-location-svg"
xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<path
    d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z">
</path>container
</svg><a href="index.html"> All Accessories <svg class="main-heading-arrow cate-location-svg"
xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<path
    d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z">
</path>container
</svg></a><a href="index.html">Home</a>
<div class="filter-catg-name">
<p>${id}</p>
</div>`;

function dispBrand(products) {
  let allBrands = products.map((e) => {
    return e.brand;
  });

  let eachBrand = allBrands.filter((item, index) => {
    return allBrands.indexOf(item) === index;
  });
  let showEachBrand = eachBrand.map((e) => {
    let dispEachBrand = e;
    Brand.innerHTML += `<input type="checkbox" name="" id="" class="brandName-check">&nbsp;${dispEachBrand}<br>`;
  });
}
