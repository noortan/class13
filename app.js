'use strict';
	
	const orderForm = document.getElementById( 'order-form' );
	const ordersList = document.getElementById( 'orders' );
	
	function Order(name, size, milk, isHot, drinkType) {
	  this.name = name;
	  this.size = size;
	  this.milk = milk;
	  this.isHot = isHot;
	  this.drinkType = drinkType; 
	  Order.all.push(this);
	}
	
	Order.all = [];
	
	Order.prototype.render = function () {
	  let liEle = document.createElement('li');
	  ordersList.appendChild(liEle);
	  let hot;
	  if(this.isHot) {  
	    hot = 'hot';
	  }  else {
	    hot = 'cold';
	  }
	  liEle.textContent = `${this.name} ordered a ${hot} ${this.drinkType} with ${this.milk} milk`;
	}
	
	function eventHandler(event) {
	  event.preventDefault();
	
	  let name = event.target.name.value;
	  let size = event.target.size.value;
	  let milk = event.target.milk.value;
	  let drinkType = event.target.drinkType.value;
	  let isHot = event.target.isHot.checked;
	
	  let newOrder = new Order(name, size, milk, isHot, drinkType);
	  newOrder.render();
	  console.log(Order.all)
	
	  localStorage.setItem('orders', JSON.stringify(Order.all));
	}
	
	orderForm.addEventListener('submit', eventHandler);
	
	function getData() {
	  let data = JSON.parse(localStorage.getItem('orders'));
	  if(data) {
	    for(let i = 0; i < data.length; i++) {
	      let newOrder = new Order(data[i].name, data[i].size, data[i].milk, data[i].isHot, data[i].drinkType);
	      newOrder.render();
	
	    }
	  }
	  console.log(Order.all);
	}
	
	getData();
