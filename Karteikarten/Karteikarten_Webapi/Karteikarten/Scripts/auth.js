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
            success: function(a,b) {
                console.log(a,b);
            },
            error: function(a,b,c) {
                console.log(a,b,c);
            },
            contentType: 'application/json'
        });
    }



})(window, jQuery);