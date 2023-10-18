class Item {
  constructor(id, name, imgSrc, desc, price) {
    this.id = `item-${id}`;
    this.name = name;
    this.imgSrc = imgSrc;
    this.desc = desc;
    this.price = price;
    this.qty = 0;
    this.totalPrice = 0;
  }
}

class Model {
  constructor() {
    this.productData = [
      {
        id: 1,
        name: "Casual Shirt",
        imgSrc: "./images/Casual Shirt.jpg",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, ipsum.",
        price: 650,
        qty: 0,
        totalPrice: 0,
      },

      {
        id: 2,
        name: "Denim Pants",
        imgSrc: "./images/Denim Pants.jpg",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, ipsum.",
        price: 1250,
        qty: 0,
        totalPrice: 0,
      },

      {
        id: 3,
        name: "Formal Shirt",
        imgSrc: "./images/Formal Shirt.jpg",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, ipsum.",
        price: 780,
        qty: 0,
        totalPrice: 0,
      },

      {
        id: 4,
        name: "Leather Bag",
        imgSrc: "./images/Leather Bag.jpg",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, ipsum.",
        price: 1500,
        qty: 0,
        totalPrice: 0,
      },

      {
        id: 5,
        name: "Leather Shoes",
        imgSrc: "./images/Leather Shoes.jpg",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, ipsum.",
        price: 2080,
        qty: 0,
        totalPrice: 0,
      },

      {
        id: 6,
        name: `Blazer`,
        imgSrc: `./images/Blazer.jpg`,
        desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, ipsum.`,
        price: 3580,
        qty: 0,
        totalPrice: 0,
      },
      {
        id: 7,
        name: `Sport Shoes`,
        imgSrc: `./images/Sport Shoes.jpg`,
        desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, ipsum.`,
        price: 2500,
        qty: 0,
        totalPrice: 0,
      },
      {
        id: 8,
        name: `Sun Glasses`,
        imgSrc: `./images/Sun Glasses.jpg`,
        desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, ipsum.`,
        price: 1500,
        qty: 0,
        totalPrice: 0,
      },
      {
        id: 9,
        name: `T Shirt`,
        imgSrc: `./images/T Shirt.jpg`,
        desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, ipsum.`,
        price: 600,
        qty: 0,
        totalPrice: 0,
      },
      {
        id: 10,
        name: `Watch`,
        imgSrc: `./images/Watch.jpg`,
        desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, ipsum.`,
        price: 7600,
        qty: 0,
        totalPrice: 0,
      },
    ];
    this.cart = [];

    this.totalQty = this._calcTotalQty(this.cart);
    this.totalCost = this._calcTotalCost(this.cart);
  }
  addToCart(id, qty) {
    // fetch data from product
    const product = this.productData.find((pro) => pro.id === id);

    // Create new item based on product details
    const item = new Item(
      product.id,
      product.name,
      product.imgSrc,
      product.desc,
      product.price
    );

    // check if item is already present in cart
    const itemPresent = this.cart.find((cartItem) => cartItem.id === item.id);
    if (itemPresent) {
      // if item is present
      itemPresent.qty += qty;
      if (itemPresent.qty <= 0) {
        // delete item present
        const itemIndex = this.cart.findIndex(
          (cartItem) => cartItem.id === itemPresent.id
        );
        this.cart.splice(itemIndex, 1);
      }
      itemPresent.totalPrice = itemPresent.qty * itemPresent.price;
    } else {
      // if item is not present
      item.qty = qty;
      item.totalPrice = item.qty * item.price;
      this.cart.push(item);
    }
    this.totalQty = this._calcTotalQty(this.cart);
    this.totalCost = this._calcTotalCost(this.cart);
  }

  _calcTotalQty(cart) {
    return cart.reduce((total, item) => total + item.qty, 0);
  }
  _calcTotalCost(cart) {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  }
}

class View {
  constructor() {
    this.containerEl = document.getElementById(`container`);
    this.navEl = document.querySelector(`nav`);
    this.checkoutSectionEl = document.querySelector(`.checkoutSection`);
    this.cartEl = document.querySelector(`.shoppingList`);

    // open cart if click on shopping bag
    this.navEl.addEventListener(`click`, (event) => {
      const targetEvent = event.target;
      if (!targetEvent.closest(`.cartBtn`)) return;
      this.showCart();
    });

    // close cart if click on close btn
    this.checkoutSectionEl.addEventListener(`click`, (event) => {
      const targetEvent = event.target;
      if (!targetEvent.classList.contains(`closeBtn`)) return;
      this.closeCart();
    });
  }

  renderProducts(productData) {
    this.containerEl = document.getElementById(`container`);
    this.containerEl.innerHTML = ``;
    productData.forEach((data) => {
      const productHtml = this.fillData(data);
      this.containerEl.insertAdjacentHTML(`beforeend`, productHtml);
    });
  }
  fillData(data) {
    const { id, name, imgSrc, desc, price, qty } = data;
    return `
        <div class="product" id=${id}>
          <img src="${imgSrc}" class="productImg" />
          <div class="productDetails" >
            <div class="namePrice">
              <h3 class="productName">${name}</h3>
            
             <p class="productPrice"><i class="fa-solid fa-indian-rupee-sign"></i> <span class="price" >${price}</span>/-</p>

            </div>
          
            <p class="productDesc">${desc}</p>
          
            <div class="buy">
              <button class="btn addToCartBtn blueBtn">Add to Cart</button>
              <button class="btn buyBtn orangeBtn">Buy Now</button>
            </div>
          </div>
        </div>
        `;
  }

  bindAddToCart(handler) {
    // this.cartEl.addEventListener(`click`,event=>{
    //   const eventTarget = event.target;
    //   const add = eventTarget.classList.contains(`addBtn`);
    //   const minus = eventTarget.classList.contains(`minusBtn`);
    //   if(!add && !minus)return;
    //   const itemId = eventTarget.closest(`.shoppingItem`).id;
    //   add?handler(+itemId,1):handler(+itemId,-1);
    // });


    this.containerEl.addEventListener(`click`, (event) => {
      const targetEl = event.target;
      if (
        !targetEl.classList.contains(`addToCartBtn`) &&
        !targetEl.classList.contains(`buyBtn`)
      )
        return;
      const productId = targetEl.closest(`.product`).id;

      handler(+productId, 1);
    });
  }

  showCart() {
    this.checkoutSectionEl.classList.add(`active`);
    this.navEl.classList.add(`hidden`);
    this.containerEl.classList.add(`blur`);
  }

  closeCart() {
    this.checkoutSectionEl.classList.remove(`active`);
    this.navEl.classList.remove(`hidden`);
    this.containerEl.classList.remove(`blur`);
  }
  updateTotalQty(totalQty) {
    const totalQtyEl = document.querySelector(`.totalQty`);
    if (!totalQty) totalQtyEl.style.display = `none`;
    else {
      totalQtyEl.style.display = `block`;
      totalQtyEl.innerText = totalQty;
    }
  }

  fillDataIntoCart(data){
    this.cartEl.innerHTML=``;
    data.forEach(function(itemData){
      const itemHtml = `
      <li class="shoppingItem" id="${itemData.id}">
      <img src="${itemData.imgSrc}" />
      <div class="itemNamePrice">
        <p class="itemName">${itemData.name}</p>
        <h4>
          <i class="fa-solid fa-indian-rupee-sign"></i>
          <span class="itemPrice">${itemData.price}</span>
        </h4>
      </div>
      <div class="itemQtyInfo">
        <button class="minusBtn btn">-</button>
        <span class="itemQty">${itemData.qty}</span>
        <button class="addBtn btn">+</button>
      </div>
      <h4>
        <i class="fa-solid fa-indian-rupee-sign"></i>
        <span class="itemTotalPrice">${itemData.totalPrice}</span>
      </h4>
      <button class="btn deleteBtn">Delete</button>
    </li>
      `;
      const cartEl = document.querySelector(`.shoppingList`);
      cartEl.insertAdjacentHTML(`beforeend`,itemHtml);
    });
   
  }

  updateSummary(totalQty, totalCost){
    const summaryHtml = `
    <div class="summary">
    <div class="summaryQty">Items : <h3 class="allItemsQty">${totalQty}</h3></div>
    <div class="summaryAmount">  
      <i class="fa-solid fa-indian-rupee-sign"></i>
      <h3 class="allItemsPrice">${totalCost}</h3>
    </div>
  </div>
    `;
    this.cartEl.insertAdjacentHTML(`beforeend`,summaryHtml);
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.renderProducts(this.model.productData);
    this.view.bindAddToCart(this.handleAddToCart.bind(this));
    this.view.updateTotalQty(this.model.totalQty);
  }
  handleAddToCart(id, qty) {
    this.model.addToCart(id, qty);
    this.view.updateTotalQty(this.model.totalQty);
    this.view.fillDataIntoCart(this.model.cart);
    this.view.updateSummary(this.model.totalQty,this.model.totalCost);
  }

}

const app = new Controller(new Model(), new View());
