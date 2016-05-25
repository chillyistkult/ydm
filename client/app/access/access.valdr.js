angular.module('ydmApp')
    .factory('sameValidator', function () {
        return {
            name: 'same',
            validate: function (value, args) {
                return value === document.querySelector('[name="' + args.as + '"]').value;
            }
        };
    })
    .config(function (valdrProvider) {
        valdrProvider.addValidator('sameValidator');
        valdrProvider.addConstraints({
            'Login': {
                'username': {
                    'required': {
                        'message': 'Pflichtfeld'
                    },
                },
                'email': {
                    'required': {
                        'message': 'Pflichtfeld'
                    },
                    'email': {
                        'message': 'Keine gültige E-Mail Adresse'
                    }
                },
                'password': {
                    'required': {
                        'message': 'Pflichtfeld'
                    },
                    /*
                    'pattern': {
                        'value': /^(?=.*\d).{6,}$/,
                        'message': 'Passwort muss mindestens sechs Zeichen lang und eine Zahl enthalten'
                    }
                    */
                },
                'passwordConfirm': {
                    'required': {
                        'message': "Pflichtfeld"
                    },
                    'same': {
                        'as': "password",
                        'message': 'Das neu vergebene Passwort stimmt nicht überein'
                    }
                }
            },
        });
    });