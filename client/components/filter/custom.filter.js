'use strict';

angular.module('ydmApp')
    .filter('highlight', function ($sce) {
        return function (text, phrase) {
            if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
                '<span class="font-bold">$1</span>')
            return $sce.trustAsHtml(text)
        }
    })
    .filter('firstOfGroup', function () {
        return function (collection, id) {
            for(var i = 0; i < collection.length; i++) {
                if(collection[i].group.id === id) {
                    return collection[i];
                }
            }
            return null;
        }
    })
