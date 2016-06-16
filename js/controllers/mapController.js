angular.module('starter').controller('MapController',
  [ '$scope',
    '$cordovaGeolocation',
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    'LocationsService',
    'InstructionsService',
    function(
      $scope,
      $cordovaGeolocation,
      $stateParams,
      $ionicModal,
      $ionicPopup,
      LocationsService,
      InstructionsService
      ) {

      /**
       * Once state loaded, get put map on scope.
       */
      $scope.$on("$stateChangeSuccess", function() {

        $scope.locations = LocationsService.savedLocations;
        $scope.newLocation;

       /* if(!InstructionsService.instructions.newLocations.seen) {

          var instructionsPopup = $ionicPopup.alert({
            title: 'Agregar Ubicación',
            template: InstructionsService.instructions.newLocations.text
          });
          instructionsPopup.then(function(res) {
            InstructionsService.instructions.newLocations.seen = true;
            });

        }*/
       

        $scope.map = {
          defaults: {
            tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
           // tileLayer: 'img/MapQuest/{z}/{x}/{y}.jpg',
            maxZoom: 16,
            minZoom: 10,
           // zoomControlPosition: 'bottomleft'
          },
          markers : {},
          events: {
            map: {
              enable: ['context'],
              logic: 'emit'
            },
          }
        };

        $scope.goTo(0);
      
      });

    

      var Location = function() {
        if ( !(this instanceof Location) ) return new Location();
        this.lat  = "";
        this.lng  = "";
        this.name = "";
      };

      $ionicModal.fromTemplateUrl('templates/addLocation.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.modal = modal;
        });


      
      
      
    
      /*
        INICIO DE EVENTOS
      */
   
      /**
       * tap en el mapa
       */
      $scope.$on('leafletDirectiveMap.contextmenu', function(event, locationEvent){
        $scope.newLocation = new Location();
        $scope.newLocation.lat = locationEvent.leafletEvent.latlng.lat;
        $scope.newLocation.lng = locationEvent.leafletEvent.latlng.lng;
        $scope.modal.show();
      });

      /**
       * ZoomInicio
       */
      $scope.$on('leafletDirectiveMap.zoomstart', function(){
        
       /* if($scope.map.center.zoom != 10){
         $scope.map.center.zoom=16;
          console.log("______"+$scope.map.center.zoom);
        }*/
          var zoom1= $scope.Map;
          console.log("--"+zoom1);
          console.log("_"+$scope.map.center.zoom);
    
      });


/*
      map.on("zoomstart", function(){
      zoomLev = map.getZoom();

      if (zoomLev < 14){
      map.removeLayer(lariac);

      }else{

      map.addLayer(lariac);
      }
      });
*/

      


      $scope.$on('leafletDirectiveMap.zoomend', function(event){
        console.log('_._');
        //event.targetScope.$$childHead.map.setZoom(16);
        //console.log(event.targetScope.$$childHead.map.center.zoom);
        //zoomend
     /* if ($scope.map.getZoom() > 9 && map.hasLayer(heatmapLayer)) {
          $scope.map.removeLayer(heatmapLayer);
      }
      if ($scope.map.getZoom() < 9 && $scope.hasLayer(heatmapLayer) == false)
      {
          $scope.map.addLayer(heatmapLayer);
      }*/
      // L.tileLayer($scope.map.center.zoom,{setzoom:13});
      //var map = $scope.map;
     // console.log(map);
      console.log($scope.map.center.zoom);
     // $scope.map.getZoom();
     // console.log($scope.map);
      });  


      /*$scope.$on('leafletDirectiveMap.zoomend', function(){
        document.getElementById('zoom-level').innerHTML = 'Zoom Level: ' + $scope.map.getZoom();
        console.log($scope.getZoom());
      });*/

      $scope.saveLocation = function() {
        LocationsService.savedLocations.push($scope.newLocation);
        $scope.modal.hide();
        $scope.goTo(LocationsService.savedLocations.length - 1);
      };

      /**
       * Center map on specific saved location
       * @param locationKey
       */
      $scope.goTo = function(locationKey) {

        var location = LocationsService.savedLocations[locationKey];

        $scope.map.center  = {
          lat : location.lat,
          lng : location.lng,
          zoom : 10,
        };

        $scope.map.markers[locationKey] = {
          lat:location.lat,
          lng:location.lng,
          message: location.name,
          focus: true,
          draggable: false
        };

      };

      /**
       * Center map on user's current position
       */
      $scope.locate = function(){

        $cordovaGeolocation
          .getCurrentPosition()
          .then(function (position) {
            $scope.map.center.lat  = position.coords.latitude;
            $scope.map.center.lng = position.coords.longitude;
            $scope.map.center.zoom = 10;

            $scope.map.markers.now = {
              lat:position.coords.latitude,
              lng:position.coords.longitude,
              message: "Esta Aqui!!!",
              focus: true,
              draggable: false
            };

          }, function(err) {
            // error
            console.log("Error de Ubicación!");
            console.log(err);
          });

      };

    }]);