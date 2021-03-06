angular.module('roadtrippin.mapsFactory', [])

  .factory('mapFactory', function($http, $q, $window, $location) {

    //send endpoints and array of waypoints to the server
    var shareJourney = function(selectedTrip) {
      console.log(selectedTrip);
      var deferred = $q.defer ();
      $http({
        method: 'POST',
        url: '/shareJourney',
        data: JSON.stringify(selectedTrip)
      }).then(function (res) {
        deferred.resolve (res);
      }).catch(function (err) {
        deferred.reject (err);
      });
      return deferred.promise;
    };
    var deleteJourney = function (trip) {
      var deferred = $q.defer();
      $http.post('/deleteJourney', {
        data: trip
      }).then(function (res) {
        deferred.resolve (res);
      }).catch(function (err) {
        deferred.reject (err);
      });
      return deferred.promise;
    }
    var saveJourneyWithWaypoints = function (tripObject, username) {
      // console.log(username);
      // console.log(tripObject);
      tripObject.username = username;
      var deferred = $q.defer ();
      $http({
        method: 'POST',
        url: '/saveJourney',
        data: JSON.stringify(tripObject)
      }).then(function (res) {
        deferred.resolve (res);
      }).catch(function (err) {
        deferred.reject (err);
      });
      return deferred.promise;
    };
    var getPopularRoutes = function() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/shareJourney'
      }).then(function (res) {
        deferred.resolve (res.data);
      }).catch(function (err) {
        deferred.reject (err);
      });
      return deferred.promise;
    };
    var getAllRoutes = function() {
      var username = localStorage.username;
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/saveJourney/' + username
      }).then(function (res) {
        // console.log(res.data);
        deferred.resolve (res.data);
      }).catch(function (err) {
        deferred.reject (err);
      });
      return deferred.promise;
    };

    var signout = function() {
      $window.localStorage.removeItem('com.roadtrippin');
      $window.localStorage.removeItem('username');
     // $location.path('/signin');
    };

    return {
      getPopularRoutes: getPopularRoutes,
      shareJourney: shareJourney,
      saveJourneyWithWaypoints: saveJourneyWithWaypoints,
      getAllRoutes: getAllRoutes,
      signout: signout,
      deleteJourney: deleteJourney
    };
  });
