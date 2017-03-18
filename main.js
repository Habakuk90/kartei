var btn;
var input;
var curretTab = {};
function init() {
    btn = document.querySelector('button');
    input = document.querySelector('input');
    btn.addEventListener('click', function(e,a,b) {
        var inputValue = input.value;      
        
        if (currentTab && currentTab.url) {
            alert("Hello, " + inputValue + " your current URL is: " + currentTab.url);
        }
        else {
            alert("CANNOT IDENTIFY URL; FORCING SHUTDOWN");
        }
    })
}

(function() {   
    chrome.tabs.getSelected(null, function(tab) { currentTab = tab; })

    
})();


document.addEventListener("DOMContentLoaded", function() {
    
  init();
});