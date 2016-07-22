'use strict';

angular.module('ydmApp')
    .controller('HomeCtrl', function ($scope, $filter, Repository) {

            // Index = Dropindex
            // Obj = Dragged obj
            $scope.onDropComplete = function (index, obj, event) {
                if (obj) {
                    // Get destination object
                    var destObj = $scope.filters[index];

                    // Get source index
                    var sourceIndex = $scope.filters.indexOf(obj);

                    // Swap data
                    swap(obj, destObj, 'group');
                    swap(obj, destObj, 'spaceLeft');

                    // Set objects
                    $scope.filters[index] = obj;
                    $scope.filters[sourceIndex] = destObj;

                    // Open filter control dialog
                    $scope.filtersChanged = true;
                }

                function swap(sourceObj, targetObj, key) {
                    var temp = sourceObj[key];
                    sourceObj[key] = targetObj[key];
                    targetObj[key] = temp;
                }
            }

            $scope.getTechnologies = function () {
                Repository.getTechnologies().then(function (res) {
                    $scope.technologies = res.data;
                    $scope.technology = res.data[0];
                })
            };

            $scope.getProductLines = function (id) {
                Repository.getProductLines(id).then(function (res) {
                    $scope.productLines = res.data;
                    $scope.productLine = res.data[0];
                })
            };

            $scope.getFilters = function (tId, pId) {
                Repository.getFilterByTechnologyAndProduct(tId, pId).then(function (res) {
                    $scope.filtersOriginal = angular.copy(res.data);
                    $scope.layout = $scope.getLayout(res.data);
                    $scope.filters = $scope.fillPlaceholder(res.data, $scope.layout);
                })
            };

            $scope.getLayout = function (filters) {
                /*  We are trying to determine if a boolean filter
                    occurs next to each other in respective groups */
                var layout = {};
                for (var i = 0; i < filters.length; i++) {
                    // Initialize a counter to count up the occurencies of boolean filter per group
                    if (!layout[filters[i].group.id]) {
                        layout[filters[i].group.id] = 0;
                    }
                    // Check if there are already boolean filters next to each other
                    if (layout[filters[i].group.id] < 2) {
                        // Is the current filter a boolean one?
                        if (filters[i].type.id == 1 && filters[i].spaceLeft == 0) {
                            // If yes, count up
                            layout[filters[i].group.id] += 1;
                        } else {
                            // If not, reset counter to 0
                            layout[filters[i].group.id] = 0;
                        }
                    }
                }
                return layout;
            }

            var calcSpace = function(filter, columns) {
                return columns == 2 ? 0 : filter.spaceLeft - 160;
            }

            $scope.fillPlaceholder = function (filters, layout) {
                var groups = {};

                /* We are trying to transform traditional layout to our grid system.
                 * To achive this we fill the filter collection with placeholder objects
                 * if there is a spacing defined */
                for (var i = 0, j = 0; i < filters.length; i++, j = i) {
                    var columns = layout[filters[i].group.id] < 2 ? 2 : 3;
                    while (filters[j].spaceLeft > 134) {
                        var space = filters[j].spaceLeft / (columns - 1);
                        insert(filters, {
                            spaceLeft: calcSpace(filters[j], columns),
                            group: angular.copy(filters[j].group)
                        }, j);
                        i++;
                    }
                }

                /*
                 for (var j = 0; j < columns - (filters.length % columns); j++) {
                 insert(filters, {group: angular.copy(filters[i].group)}, i + 1);
                 }
                 */

                function insert(collection, item, index) {
                    collection.splice(index, 0, item);
                }

                return filters;
            };

            $scope.update = function () {

            };

            $scope.reset = function () {
                $scope.filters = $scope.fillPlaceholder(angular.copy($scope.filtersOriginal), $scope.layout);
                $scope.filtersChanged = false;
            };

            $scope.$watchGroup(['technology'], function (newValue, oldValue) {
                if (!angular.equals(newValue, oldValue)) {
                    $scope.getProductLines($scope.technology.id);
                }
            });

            $scope.$watchGroup(['productLine'], function (newValue, oldValue) {
                if (!angular.equals(newValue, oldValue)) {
                    $scope.getFilters($scope.technology.id, $scope.productLine.id);
                }
            });

            var init = function () {
                $scope.getTechnologies();
            }
            init();
        }
    );
