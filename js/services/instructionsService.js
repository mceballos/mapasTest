
angular.module('starter').factory('InstructionsService', [ function() {

  var instructionsObj = {};

  instructionsObj.instructions = {
    newLocations : {
      text : 'tap en el mapa, para una nueva ubicación',
      seen : false
    }
  };

  return instructionsObj;

}]);

