(function(){
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', " https://davids-restaurant.herokuapp.com/menu_items.json")
  .directive('foundItems', FoundItemsDirective);


  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var selection = this;
    selection.found = [];
    selection.searchTerm = '';
    selection.getSearchItems = function(){
    MenuSearchService.getMatchedMenuItems(selection.searchTerm).then(function(results){
      selection.found = results;

    })

  };

    selection.removeItem = function(itemIndex) {
      selection.found.splice(itemIndex, 1);
  };
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath){
    var service = this;
    service.getMatchedMenuItems = function(searchTerm) {
      console.log(searchTerm);
      var response = $http({
        method: "Get",
        url: (ApiBasePath)
      });
      return response.then(function(result){
        var selectedItem = searchTerm.toLowerCase();
        console.log(searchTerm);
        var foundItems = [];
        foundItems = result.data.menu_items.filter(function(item){
          return item.description.toLowerCase().indexOf(selectedItem) !== -1;
        });
        for(var i = 0; i < foundItems.length; i++){
          console.log(foundItems[i].name + " " + foundItems[i].description);
        }

        return foundItems;
      });
    };

  }
  function FoundItemsDirective() {
    var searchResults = {
      templateUrl: 'requestedMenuItems.html',
      scope: {
        menuItems: '<',
        onRemove: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'selection',
      bindToController: true
    };
    return searchResults;

  }

})();
