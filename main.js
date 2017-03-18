var btn;
var input;
var currentTab = {};

var app = {
    init: function () {
        btn = document.querySelector('button');
        input = document.querySelector('input');

        chrome.tabs.getSelected(null, function (tab) {
            currentTab = tab;
        })

        btn.addEventListener('click', function (e, a, b) {
            var inputValue = input.value;

            if (currentTab && currentTab.url) {
                alert("Hello, " + inputValue + " your current URL is: " + currentTab.url);
            } else {
                alert("CANNOT IDENTIFY URL; FORCING SHUTDOWN");
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {

    app.init();
});