'use strict';

angular.module('ydmApp')
    .factory('Message', ['MESSAGES', '$timeout',
        function (MESSAGES, $timeout) {
            var callbackFunctions = [];
            var messages = [];

            function uuid(a) {
                return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid)
            };

            function runUpdateFunctions() {
                callbackFunctions.forEach(function (callback) {
                    callback();
                });
            }

            function clearMessagesByType(type) {
                type = type || 'all';
                var newMessageList = [];
                messages.forEach(function (entry) {
                    if (type != 'all' && entry.duration != 'sticky') {
                        if (entry.type !== type) {
                            newMessageList.push(entry);
                        }
                    }
                });
                messages = angular.copy(newMessageList);
            }

            function clearMessageById(id) {
                var newMessageList = [];
                messages.forEach(function (entry) {
                    if (entry.id !== id) {
                        newMessageList.push(entry);
                    }
                });
                messages = angular.copy(newMessageList);
            }

            function logEntry(message, type, duration) {
                var newEntry = {};
                newEntry.id = uuid();
                newEntry.type = type;
                duration = duration || 5000;
                if (_.isNumber(message)) {
                    newEntry.message = MESSAGES.hasOwnProperty(message) ? MESSAGES[message] : 'Fehler #' + message + '. Falls das Problem weiterhin besteht wende dich an den Support.'
                }
                else {
                    newEntry.message = message;
                }
                if (JSON.stringify(JSON.parse(angular.toJson(messages))).indexOf(JSON.stringify(newEntry)) === -1) {
                    messages.push(newEntry);
                }
                if (_.isNumber(duration)) {
                    $timeout(function () {
                        clearMessageById(newEntry.id);
                        runUpdateFunctions();
                    }, duration);
                }
                runUpdateFunctions();
                return newEntry.id;
            }

            function getMessagesByType(type) {
                type = type || 'all';
                if (type === 'all') {
                    return messages;
                }
                var messageList = [];
                messages.forEach(function (entry) {
                    if (entry.type === type) {
                        messageList.push(entry);
                    }
                });
                return messageList;
            }

            function messageComparator(a, b) {
                var typeOrder = {
                    'error': 1,
                    'warn': 2,
                    'info': 3
                };

                if (typeOrder[a.type] > typeOrder[b.type]) {
                    return 1;
                }
                if (typeOrder[a.type] < typeOrder[b.type]) {
                    return -1;
                }
                return 0;
            }

            return {
                logSuccess: function (message, duration) {
                    return logEntry(message, 'success', duration);
                },
                logError: function (message, duration) {
                    return logEntry(message, 'error', duration);
                },
                logWarn: function (message, duration) {
                    return logEntry(message, 'warn', duration);
                },
                logInfo: function (message, duration) {
                    return logEntry(message, 'info', duration);
                },
                getMessages: function (type) {
                    var messageList = getMessagesByType(type);
                    messageList.sort(messageComparator);
                    return messageList;
                },
                clear: function (id) {
                    id ? clearMessageById(id) : clearMessagesByType();
                    runUpdateFunctions();
                },
                onUpdate: function (callbackFunction) {
                    callbackFunctions.push(callbackFunction);
                },
                printAndClear: function (type) {
                    runUpdateFunctions();
                    clearMessagesByType(type);
                },
                print: function () {
                    runUpdateFunctions();
                }
            };
        }])
    .constant('MESSAGES', {
       
    });
;
