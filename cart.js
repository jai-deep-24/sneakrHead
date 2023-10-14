// Define an object to manage the shopping cart
const shoppingCart = {
    cartItems: [],
    cartElement: document.getElementById('cart'),
    cartTotal: document.getElementById('cart-total'),
    itemCountElement: document.getElementById('item-count'),
  
    // Function to initialize the cart
    init: function () {
      this.setupCartButton();
    },
  
    // Function to show the cart
    showCart: function () {
      this.cartElement.classList.toggle('show-cart');
    },
  
    // Function to add an item to the cart
    addItemToCart: function (name, price, img) {
      const item = {
        name: name,
        price: parseFloat(price),
        img: `img-cart${img}`
      };
  
      this.cartItems.push(item);
      this.displayItemInCart(item);
      this.updateCart();
      alert('Item added to the cart');
    },
  
    // Function to display an item in the cart
    displayItemInCart: function (item) {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');
      cartItem.innerHTML = `
        <div class="cart-item d-flex justify-content-between text-capitalize my-3">
          <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
          <div class="item-text">
            <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
            <span>$</span>
            <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price.toFixed(2)}</span>
          </div>
          <a href="#" id='cart-item-remove' class="cart-item-remove"><i class="fas fa-trash"></i></a>
        </div>
      `;
  
      this.cartElement.insertBefore(cartItem, this.cartTotal);
    },
  
    // Function to update the cart totals
    updateCart: function () {
      const total = this.cartItems.reduce((acc, item) => acc + item.price, 0);
      const itemCount = this.cartItems.length;
  
      this.cartTotal.textContent = total.toFixed(2);
      this.itemCountElement.textContent = itemCount;
    },
  
    // Function to set up the cart button
    setupCartButton: function () {
      const cartInfo = document.getElementById('cart-info');
      cartInfo.addEventListener('click', () => this.showCart());
    }
  };
  
  // Initialize the shopping cart
  shoppingCart.init();
  
  // Add click event listeners to item buttons
  const cartBtn = document.querySelectorAll('.store-item-icon');
  cartBtn.forEach(btn => {
    btn.addEventListener('click', function (event) {
      if (event.target.parentElement.classList.contains('store-item-icon')) {
        let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
        let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
        let imgPath = event.target.parentElement.previousElementSibling.src;
  
        let pos = imgPath.indexOf('img') + 3;
        let img = imgPath.slice(pos);
  
        shoppingCart.addItemToCart(name, price, img);
      }
    });
  });
  