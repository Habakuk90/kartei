(function (window, $) {
    var loginButton = document.querySelector('#login');

    var model = {
        'Email': '',
        'userName': '',
        'password': ''
    }

    loginButton.addEventListener('click', function (e, a, b) {
        model.userName = $('#userNameValue').val();
        model.password = $('#passwordValue').val();
        
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
            dataType: 'text'
        }).done(function (a, b, c) { console.log(a, b, c) })
    }

    function register(model) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify(model),
            url: 'http://localhost:55845/api/account/register',
            contentType: 'application/json'
        }).done(function (a, b, c) {   console.log(a, b, c) })
    }



})(window, jQuery);