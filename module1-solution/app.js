(function(){
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);
LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunch = "";
  $scope.lunchMessage = "";

  $scope.displayLunchMessage = function(){
    var hadForLunch = lunchComsumed($scope.lunch);
    $scope.lunchMessage = hadForLunch;
  };
  function lunchComsumed(string){
    var message = "";
    if(string === "" || string === "  "){ //check for empty string
      return "Please enter data first";
    }
    var stringMessage = string.replace(/ /g, ""); // remove spaces between words
    var stringMessage = stringMessage.replace(/,/g, " "); // replace commas with spaces
    var stringLength = stringMessage.split(" ").filter(Boolean).length; //filter out null and NaN values
    if(stringLength ==  0){
      message = "Please enter data first";
    }else if(stringLength <= 3){
      message = "Enjoy!";
    }else {
      message = "Too much!";
    }
    return message;
    }
}
})();
