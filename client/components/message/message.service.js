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
        100: 'Es wurde kein Token übergeben. Authentifizierung nicht möglich.',
        101: "E-Mail Adresse und Passwort stimmen nicht überein",
        102: "Du verfügst nicht über die notwendigen Rechte diese Seite aufzurufen",
        103: "Die Eingabe konnte nicht verifiziert werden. Bitte wende dich an den Support",
        104: "Bitte bestätige noch deine E-Mail Adresse bevor du dich anmeldest! <\a href='/resend'\>Keine E-Mail bekommen?<\/a\>",
        105: "Dein Account wurde gelöscht. <\a href='/reactivate'\>Reaktivieren?<\/a\>",
        106: "Du hast bereits eine Passwortänderung angefordert. Prüfe dein E-Mail Postfach.",
        200: "Die angegebene Ressource konnte nicht gefunden werden",
        201: "Domain hat falschen Status zum Markieren.",
        202: "Status Übergang nicht erlaubt.",
        300: "Du hast nicht ausreichend Punkte um das Gebot abzugeben",
        301: "Das Maximalgebot wurde überschritten",
        302: "Dein aktuelles Gebot für diese Domain ist gleich oder höher",
        303: "Du hast bereits ein Abonnement abgeschlossen",
        304: "Für diese Domain wurde bereits ein höheres Gebot abgegeben",
        305: "Die Auktion ist bereits geschlossen",
        306: "Du hast nicht die notwendigen Rechte, um auf Auktionen mit dieser TLD zu bieten",
        307: "Du hast noch ein aktives Abonnement und musst dieses vorher <\a href='/application/settings/contract'\>kündigen.<\/a\>",
        308: "Du bist bereits Höchstbietender.<\/a\>",
        309: "Dein Account ist zurzeit gesperrt. Bitte wende dich an den Support",
        310: "Zahlungsdaten müssen aktualisiert werden",
        311: "Es existiert bereits ein Nutzer mit der angegebenen E-Mail Adresse. <\a href='/forgot_password'\>Passwort vergessen?<\/a\>",
        312: "Das alte Passwort stimmt nicht überein",
        400: "Die Domain darf nicht gelöscht werden",
        401: "Du hast bereits einen Authcode für diese Domain generiert"
    });
;
