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

    this.productData =
      JSON.parse(JSON.parse(localStorage.getItem(`productData`))) ||
      this.productData;

    this.totalQty = this._calcTotalQty(this.productData);
    
  }
  changeQty(id, qty) {
    const product = this.productData.find((pro) => pro.id === id);

    if (product.qty === 0 && qty < 0) return;
    product.qty += qty;
    product.totalPrice = product.qty * product.price;
    this.totalQty+=qty;
    this._commitChanges(this.productData);
  }
  _calcTotalQty(data){
    return data.reduce((total,product)=>total+product.qty,0);
  }
  _commitChanges(data) {
    localStorage.setItem(`productData`, JSON.stringify(JSON.stringify(data)));
  }
}

class View {
  constructor() {
    this.containerEl = document.getElementById(`container`);
    
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

  bindChangeQty(handler) {
    this.containerEl.addEventListener(`click`, (event) => {
      const targetEl = event.target;
      if (!targetEl.classList.contains(`addToCartBtn`) && !targetEl.classList.contains(`buyBtn`)) return;
      const productId = targetEl.closest(`.product`).id;
      
      handler(+productId, 1);
    });
  }
  updateTotalQty(totalQty){
    const totalQtyEl = document.querySelector(`.totalQty`);
    if(totalQty===0)totalQtyEl.style.display=`none`;
    else{
      totalQtyEl.style.display=`block`;
      totalQtyEl.innerText=totalQty;
    }
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.renderProducts(this.model.productData);
    this.view.bindChangeQty(this.handleChangeQty.bind(this));
    this.view.updateTotalQty(this.model.totalQty);
  }
  handleChangeQty(id, qty) {
    this.model.changeQty(id, qty);
    this.view.renderProducts(this.model.productData);
    this.view.updateTotalQty(this.model.totalQty);
  }
}

const app = new Controller(new Model(), new View());
