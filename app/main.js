//variables 
var $input,
    $output,
    $searchInputSelect,
    $searchOutputSelect,
    url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?',
    apiKey = 'trnsl.1.1.20170406T074435Z.462745397ec2fd4b.9f45661cedc89156721292f8ca682f261d05efa8',
    text = '&text=',
    lang = '&lang=',
    from,
    to,
    format = '&format=',
    options = '&options=',
    callback = '&callback=';

var refreshVars = function () {
    $input = $('#search-input');
    $output = $('#search-output');
    $searchInputSelect = $('#search-input-select');
    $searchOutputSelect = $('#search-output-select');
}

var buttonClick = function () {
    $('#search-button').on('click', function () {
        refreshVars();
        yandex();
    })
};

var yandex = function () {
    var xhr = new XMLHttpRequest(),
        from = $searchInputSelect.val(),
        to = $searchOutputSelect.val();

    data = 'key=' + apiKey + '&text=' + $input.val() + '&lang=' + from + '-' + to;
    console.log(url + data);
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(data);
    xhr.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            console.log(res);
            var json = JSON.parse(res);
            if (json.code == 200) {
                console.log(json);
                $output.html(json.text[0]);

            } else {
                console.log('Error Code: ' + json.code);
            }
        }
    }
}

$(document).ready(function () {
    buttonClick();

});