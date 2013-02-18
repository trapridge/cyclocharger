'use strict';

angular.module('myApp.services', []).

    factory('cordovaReady', function() {
	  	return function (fn) {	  
    	    var queue = [];
    	    var impl = function () {
    	       queue.push(Array.prototype.slice.call(arguments));
    	    };
    	    
    	    document.addEventListener('deviceready', function () {
                queue.forEach(function (args) {
    	           fn.apply(this, args);
                });
                impl = fn;
    	    }, false);
    	    
    	    return function () {
                return impl.apply(this, arguments);
    	    };
        };
	}).

    factory('notification', function ($rootScope, cordovaReady) {
        return {
            alert: function (message, alertCallback, title, buttonName) {
                navigator.notification.alert.apply(this, arguments);
            }
        };
    }).

    factory('bluetooth', function ($rootScope, cordovaReady) {

        var bt = cordova.require('cordova/plugin/bluetooth');

        return {
            connect: function(onSuccess, onError, address, id) {
                bt.connect(function() {
                    var that = this,
                        args = arguments;
                      
                    if (onSuccess) {
                        $rootScope.$apply(function () {
                            onSuccess.apply(that, args);
                        });
                    }
                }, function () {
                    var that = this,
                        args = arguments;
                  
                    if (onError) {
                        $rootScope.$apply(function () {
                            onError.apply(that, args);
                        });
                    }
                }, address, id);
            },
            disconnect: function(onSuccess, onError, socketId) {
                bt.disconnect(function() {
                    var that = this,
                        args = arguments;
                      
                    if (onSuccess) {
                        $rootScope.$apply(function () {
                            onSuccess.apply(that, args);
                        });
                    }
                }, function() {
                    var that = this,
                        args = arguments;
                  
                    if (onError) {
                        $rootScope.$apply(function () {
                            onError.apply(that, args);
                        });
                    }
                }, socketId);
            },
            read: function(onSuccess, onError, socketId) {
                bt.read(function() {
                    var that = this,
                        args = arguments;
                      
                    if (onSuccess) {
                        $rootScope.$apply(function () {
                            onSuccess.apply(that, args);
                        });
                    }
                }, function() {
                    var that = this,
                        args = arguments;
                  
                    if (onError) {
                        $rootScope.$apply(function () {
                            onError.apply(that, args);
                        });
                    }
                }, socketId);
            }
        };
    }).

    factory('sensor', function (bluetooth) {
        
        var socketId = -1;

        return {    
            connect: function(onSuccess, onError, address) {
                bluetooth.connect(function(id) {
                    socketId = id;
                    onSuccess();
                }, function(error) {
                    socketId = -1;
                    onError(error);
                }, address, '00001101-0000-1000-8000-00805f9b34fb');
            },
            disconnect: function(onSuccess, onError) {
                bluetooth.disconnect(function() {
                    socketId = -1;
                    onSuccess();
                }, function(error) {
                    onError(error);
                }, socketId);
            },
            getValue: function(onSuccess, onError) {
                bluetooth.read(function(data) {
                    onSuccess(data);
                }, function(error) {
                    onError(error);
                }, socketId);
            } 
        };
    });