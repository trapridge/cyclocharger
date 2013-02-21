'use strict';

angular.module('myApp.services', []).

    factory('safeApply', function ($rootScope) {
        return function (fn) {
            var phase = $rootScope.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {

                    console.log('Skipping a digest cycle. This may be a problem...');

                    fn();
                }
            } else {
                $rootScope.$apply(fn);
            }
        }
    }).

    factory('enqueueAndRunCordovaRequest', function() {
	  	return function (fn) {	  
    	    var queue = [];
    	    var impl = function () {
    	       queue.push(Array.prototype.slice.call(arguments));
    	    };
    	    
    	    document.addEventListener('deviceready', function () {
                queue.forEach(function (args) {
                    console.log('Calling cordova from queue!');
    	            fn.apply(this, args);
                });
                impl = fn;
    	    }, false);
    	    
    	    return function () {
                return impl.apply(this, arguments);
    	    };
        };
	}).


    factory('notification', function ($rootScope, enqueueAndRunCordovaRequest) {
        return {
            alert: enqueueAndRunCordovaRequest(function (message, alertCallback, title, buttonName) {
                navigator.notification.alert.apply(this, arguments);
            })
        }
    }).


    factory('bluetooth', function ($rootScope, enqueueAndRunCordovaRequest, safeApply) {

        var bt = cordova.require('cordova/plugin/bluetooth');

        return {
            connect: enqueueAndRunCordovaRequest(function (onSuccess, onError, address, id) {

                console.log("Connecting to: " + address);

                bt.connect(function() {
                    var that = this,
                        args = arguments;
                      
                    if (onSuccess) {
                        // $rootScope.$apply(function () {
                        safeApply(function() {
                            onSuccess.apply(that, args);
                        });
                    }
                }, function () {
                    var that = this,
                        args = arguments;
                  
                    if (onError) {
                        // $rootScope.$apply(function () {
                        safeApply(function() {
                            onError.apply(that, args);
                        });
                    }
                }, address, id);
            }),
   
            disconnect: enqueueAndRunCordovaRequest(function (onSuccess, onError, socketId) {
                bt.disconnect(function() {
                    var that = this,
                        args = arguments;
                      
                    if (onSuccess) {
                        // $rootScope.$apply(function () {
                        safeApply(function() {
                            onSuccess.apply(that, args);
                        });
                    }
                }, function() {
                    var that = this,
                        args = arguments;
                  
                    if (onError) {
                        // $rootScope.$apply(function () {
                        safeApply(function() {
                            onError.apply(that, args);
                        });
                    }
                }, socketId);
            }),

            read: enqueueAndRunCordovaRequest(function (onSuccess, onError, socketId, bufferSize) {
                bt.read(function() {
                    var that = this,
                        args = arguments;
                      
                    if (onSuccess) {
                        // $rootScope.$apply(function () {
                        safeApply(function() {
                            onSuccess.apply(that, args);
                        });
                    }
                }, function() {
                    var that = this,
                        args = arguments;
                  
                    if (onError) {
                        // $rootScope.$apply(function () {
                        safeApply(function() {
                            onError.apply(that, args);
                        });
                    }
                }, socketId, bufferSize);
            })
        }
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
                }, socketId, '8');
            } 
        }
    });