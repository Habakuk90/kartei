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
            debugger;
            app.ajaxPost();
            if (currentTab && currentTab.url) {
                alert("Hello, " + inputValue + " your current URL is: " + currentTab.url);
            } else {
                alert("CANNOT IDENTIFY URL; FORCING SHUTDOWN");
            }
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
            'Email': 'cdmin@admin.de',
            'UserName': 'cdmin',
            'Password': '123456'
        }
        
        $.ajax({
            type: 'POST',
            data: JSON.stringify(model),
            url: 'http://localhost:55845/api/account/register',
            contentType: 'application/json'
        }).done(function(a,b,c) {console.log(a,b,c)})
    }
}

document.addEventListener("DOMContentLoaded", function () {

    app.init();
    app.ajax();
});