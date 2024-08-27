
document.addEventListener('DOMContentLoaded', () => {
  const cartItems = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  const checkoutButton = document.getElementById('checkout');
  const loginReminderModal = document.getElementById('loginReminderModal');
  const loginRedirectBtn = document.getElementById('loginRedirectBtn');
  const closeButtons = document.querySelectorAll('.close');


  function updateCart() {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cartItems.innerHTML = '';
      let totalPrice = 0;

      cart.forEach((item, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td><img src="${item.image}" alt="${item.name}" width="50"></td>
              <td>${item.name}</td>
              <td>${item.quantity} gm</td>
              <td>${item.cost} Rs</td>
              <td><button class="remove-button" data-index="${index}">Remove</button></td>
          `;

          cartItems.appendChild(row);
          totalPrice += item.cost;
          console.log(item.cost)
         
         
        
      });

      totalPriceElement.textContent = `${totalPrice} Rs`;
      localStorage.setItem('totalPrice', totalPrice);
     
  }
  

  cartItems.addEventListener('click', (event) => {
      if (event.target.classList.contains('remove-button')) {
          const index = event.target.dataset.index;
          let cart = JSON.parse(localStorage.getItem('cart')) || [];
          cart.splice(index, 1);
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCart();
      }
  });

  let UserCreds = sessionStorage.getItem("user-creds");
  let UserInfo = sessionStorage.getItem("user-info");
  function checkLoginStatus(){
    if(!UserCreds){
      console.log("user not loged in")
      window.location.href = '/mainApplication/RALpages/login.html';
    }
   
  }
  checkoutButton.addEventListener('click',function(e){
    e.preventDefault();
    checkLoginStatus();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
              totalPriceElement.textContent = 'Your cart is empty';
          }

          else{
            window.location.href = '/mainApplication/RALpages/address.html';
          }
       
    })


loginRedirectBtn.onclick = function() {
    window.location.href = '/mainApplication/RALpages/login.html'; // Redirect to login page
  };

  closeButtons.forEach(btn => {
    btn.onclick = function() {
      loginReminderModal.style.display = 'none'; // Close modal
    };
  });

  

  updateCart();
});
