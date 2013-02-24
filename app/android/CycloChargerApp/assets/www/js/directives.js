'use strict';

angular.module('myApp.directives', []).
	
    directive('ngTap', function() {
	    return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var tapping = false;
                
                element.bind('touchstart', function(e) {
                    element.addClass('active');
                    tapping = true;
                });
                
                element.bind('touchmove', function(e) {
                    element.removeClass('active');
                    tapping = false;
                });
                  
                element.bind('touchend', function(e) {
                    element.removeClass('active');
                    if (tapping) {
                        scope.$apply(attrs['ngTap'], element);
                    }
                });
    	    }
        }
  	}).

    directive('superButton', function(){
        return {
            // restrict to an element (A = attribute, C = class, M = comment)
            // or any combination like 'EACM' or 'EC'
            restrict: 'E',
            scope: {
                name: '=foo',   // set the name on the directive's scope
                                // to the name attribute on the directive element.
                func: '&func'
            },
            //the template for the directive.
            template: '<div>Hello, {{name}} <button>Reverse</button></div>',
            //template: '<p><a id="data" ng-click="getValue()" class="btn btn-primary btn-large">Get data</a></p>',
            //the controller for the directive
            controller: function($scope) {
                $scope.reverseName = function(){
                    $scope.name = $scope.name.split('').reverse().join('');
                };
            },
            replace: true, //replace the directive element with the output of the template.
            //the link method does the work of setting the directive
            // up, things like bindings, jquery calls, etc are done in here
            link: function(scope, elem, attr) {
                // scope is the directive's scope,
                // elem is a jquery lite (or jquery full) object for the directive root element.
                // attr is a dictionary of attributes on the directive element.
                // elem.bind('dblclick', function() {
                //     scope.name += '!';
                //     scope.$apply();
                // });

                elem.children().bind('click', function() {
                    scope.reverseName();
                    scope.$apply();
                    scope.func({someValue:'testing'});
                });

            }
        };
    });