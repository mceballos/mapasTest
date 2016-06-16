angular.module('starter').factory('LocationsService', [ function() {

  var locationsObj = {};

  locationsObj.savedLocations = [
    {
      name : "U. Autonoma",
      lat : -38.73349804,
      lng : -72.61884570
    },
    {
      name : "U. Mayor",
      lat : -38.73550662,
      lng : -72.60540246
    },
    {
      name : "CERRO TOLPAN",
      lat : -37.671117,
      lng : -72.657127
    },    {
      name : " BALNEARIO MUNICIPAL DE RENAICO",
      lat : -37.669633,
      lng : -72.589062
    },

  ];

  return locationsObj;

}]);