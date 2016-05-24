'use strict';

angular.module('ydmApp')
    .directive('messages', ['Message', function (Message) {
        return {
            templateUrl: 'components/message/message.html',
            restrict: 'AE',
            link: function ($scope, element, attrs) {
                element.addClass('messages');
                function update() {
                    $scope.messages = Message.getMessages();
                }
                $scope.dismiss = function (id) {
                    Message.clear(id);
                };
                Message.onUpdate(update);
                Message.print();
            },
        };
    }]);
