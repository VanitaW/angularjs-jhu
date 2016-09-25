(function(){
'use strict';
angular.module('ShoppingListCheckOff',[])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService']; // Controller of items to buy

function ToBuyShoppingController(ShoppingListCheckOffService){
  var buy = this;
  buy.itemsToBuyList= ShoppingListCheckOffService.getItems(); // get shopping list
  buy.removeItem = function(itemIndex) {  // remove items purchased
    ShoppingListCheckOffService.removeItem(itemIndex);
  };

}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService']; // Controller of items bought
function AlreadyBoughtShoppingController(ShoppingListCheckOffService){
  var itemsBought = this;
  itemsBought.itemsBoughtList = ShoppingListCheckOffService.getBoughtItems(); // get items bought

}

function ShoppingListCheckOffService() {
  var service = this;
  var bought = [];
  var itemsToBuy = [
      {
        name: "Milk",
        quantity: "1 gallon"
      },
      {
        name: "Bread",
        quantity: "2 loaves"
      },
      {
        name: "Cheese",
        quantity: "1 package"
      },
      {
        name: "Strawberries",
        quantity: "3 pints"
      },
      {
        name: "Diet Cherry Coke",
        quantity: "6 cans"
      }
    ];

    service.getItems = function () { // list of items to buy
      return itemsToBuy;
    };
    service.getBoughtItems = function() { // list of items bought
      return bought;
    };

    service.removeItem = function(itemIndex){ // remove items from to buy and add to bought
      var item = {
        name: itemsToBuy[itemIndex].name,
        quantity: itemsToBuy[itemIndex].quantity
        };
      bought.push(item);
      itemsToBuy.splice(itemIndex,1);
    };
}


})();
