//jqstuff 
$(document).ready(function () {
    if ($('.translator').length) {
        translateButtonClick();
    }
    refreshVars();
    questionButtonClick();
    closeButtonClick();
});



//translation Area
var $input,
    $output,
    $searchInputSelect,
    $searchOutputSelect,
    $quest,
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
    $quest = $('.question');
}
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
            var response = this.responseText;
            console.log(response);
            var json = JSON.parse(response);
            if (json.code == 200) {
                console.log(json);
                if (json.text[0] == $input.val()) {
                    $output.html('Sorry but the Word is too similiar');
                } else {
                    $output.val(json.text[0]);
                }

            } else {
                console.log('Error Code: ' + json.code);
            }
        } else {
            $output.val('Sorry but something went wrong!');
        }
    }
}
var translateButtonClick = function () {
    $('#search-button').on('click', function () {
        refreshVars();
        yandex();
    })
};


// end of translation Area

//Question Area
var questionButtonClick = function () {
    var $btnQuestion = $('.btn-question');
    $btnQuestion.on('click', function () {

        $quest.addClass('is-active');


    });
}
var closeButtonClick = function () {
    var $btnClose = $('.btn-close');
    $btnClose.on('click', function () {
        $quest.removeClass('is-active');

    })

}


//end of Question Area