var app = {
    init: function () {
        var btn = document.querySelector('button');
        var input = document.querySelector('input');
        var currentTab = {};
        chrome.tabs.getSelected(null, function (tab) {
            currentTab = tab;
        })

        btn.addEventListener('click', function (e, a, b) {
            var inputValue = input.value;

            app.ajaxPost(); 
        });
    },
    ajax: function () {
        $.ajax("http://local.karteikarten.de/api/values", { // gib hier deine localhost:PORT addresse ein. Oder bindings einrichten beim iis
            success: function (a, b, c) {
                console.log(a,b,c);
            }
        });
    },
    ajaxPost: function() {
        var model = {
            'Email': 'bdmin@admin.de',
            'UserName': 'bdmin',
            'Password': '123456'
        }
        
        $.ajax({
            type: 'POST',
            data: JSON.stringify(model),
            url: 'http://localhost:55845/api/account/login',
            contentType: 'application/json'
        }).done(function(a,b,c) {console.log(a,b,c)})
    }
}

document.addEventListener("DOMContentLoaded", function () {

    app.init();
    app.ajax();
});