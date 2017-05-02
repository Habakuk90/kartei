(function (window, $) {
    var loginButton = document.querySelector('#login');

    var model = {};

    loginButton.addEventListener('click', function (e, a, b) {
        model.UserName = $('#userNameValue').val();
        model.Password = $('#passwordValue').val();

        login(model);
    });

    var registerButton = document.querySelector('#register');

    registerButton.addEventListener('click', function (e, a, b) {
        model.UserName = $('#userNameValue').val();
        model.Password = $('#passwordValue').val();
        register(model);
    });




    function login(model) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify(model),
            url: 'http://localhost:55845/api/account/login',
            contentType: 'application/json',
            success: function (a, b, c) {
                console.log(a, b, c)
            }
        });
    }

    function register(model) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify(model),
            url: 'http://localhost:55845/api/account/register',
            success: function (a, b) {
                console.log(a, b);
            },
            error: function (a, b, c) {
                console.log(a, b, c);
            },
            contentType: 'application/json'
        });
    }





    $('#karteiForm').submit(function () {
        var $input = $('#input'),
            $inputLang = $('#inputLang'),
            $output = $('#output'),
            $outputLang = $('#outputLang');

        var karteiModel = {
            input: $input.val(),
            inputLang: $inputLang.val(),
            output: $output.val(),
            outputLang: $outputLang.val()
        }


        $.ajax({
            type: 'POST',
            data: JSON.stringify(karteiModel),
            url: 'http://localhost:55845/api/kartei/create',
            contentType: 'application/json',
            success: function (a, b, c) {
                console.log(a, b, c)
            }
        });
        return false;
    });



    $('#sessionTest').on('click', function (a,b) {
        var karteiArr = [{
            "input": "Ramon",
            "output": "Clemmy",
            "inputLang": "Konrad",
            "outputLang": "ckonrad0@webs.com"
        }, {
            "input": "Hannis",
            "output": "Rochette",
            "inputLang": "Brogiotti",
            "outputLang": "rbrogiotti1@skyrock.com"
        }, {
            "input": "Newton",
            "output": "Ivan",
            "inputLang": "Packwood",
            "outputLang": "ipackwood2@admin.ch"
        }, {
            "input": "Uta",
            "output": "Klara",
            "inputLang": "Tockell",
            "outputLang": "ktockell3@yellowpages.com"
        }, {
            "input": "Zsazsa",
            "output": "Sunny",
            "inputLang": "Hedau",
            "outputLang": "shedau4@who.int"
        }, {
            "input": "Bonnie",
            "output": "Temp",
            "inputLang": "Rickersy",
            "outputLang": "trickersy5@google.com.br"
        }, {
            "input": "Delainey",
            "output": "Tish",
            "inputLang": "Gally",
            "outputLang": "tgally6@engadget.com"
        }, {
            "input": "Odessa",
            "output": "Stanleigh",
            "inputLang": "Corish",
            "outputLang": "scorish7@bandcamp.com"
        }, {
            "input": "Catherin",
            "output": "Agna",
            "inputLang": "Beresford",
            "outputLang": "aberesford8@si.edu"
        }, {
            "input": "Tandy",
            "output": "Smith",
            "inputLang": "Wrightem",
            "outputLang": "swrightem9@w3.org"
        }];
        var karteiObj = {};

        $.ajax({
            type: 'POST',
            data: JSON.stringify(karteiArr),
            url: 'http://localhost:55845/api/session/create',
            contentType: 'application/json',
            success: function (a,b) {
                console.log(a, b);
            }
        })
    });

})(window, jQuery);

