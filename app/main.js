//translation Area
var $input,
    $output,
    $searchInputSelect,
    $searchOutputSelect,
    $quest,
    url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?',
    apiKey = 'trnsl.1.1.20170406T074435Z.462745397ec2fd4b.9f45661cedc89156721292f8ca682f261d05efa8',
    cS,
    text = '&text=',
    lang = '&lang=',
    fromShort,
    fromLong,
    toShort,
    toLong,
    format = '&format=',
    options = '&options=',
    callback = '&callback=',
    karteiKarte = {},
    session = [];
var counter = 0;

var refreshVars = function () {
    $input = $('#search-input');
    $output = $('#search-output');
    $searchInputSelect = $('#search-input-select');
    $searchOutputSelect = $('#search-output-select');
    fromShort = $searchInputSelect.val();
    fromLong = $('#search-input-select option:selected').text();
    toShort = $searchOutputSelect.val();
    toLong = $('#search-output-select option:selected').text();
    $quest = $('.question');
}
var translateRequest = function () {
    var xhr = new XMLHttpRequest();

    // from = $searchInputSelect.val();
    // to = $searchOutputSelect.val();

    data = 'key=' + apiKey + text + $input.val() + lang + fromShort + '-' + toShort;
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
                    fillSession();

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
        translateRequest();
    });
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


//Local Storage Area

var isEmpty = function (obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

var storageCheck = function () {

    chrome.storage.local.get(function (cS) {

        if (!isEmpty(cS.session)) {
            if (cS.session.length > counter) {
                counter = cS.session.length;
                for (i = 0; i < counter; i++) {
                    session.push(cS.session[i]);
                }
                console.log(session);
                counter++
            }
        } else {
            console.info('Chrome Local Storage is empty!');
        }
    });
}

var fillSession = function () {

    karteiKarte = {
        id: counter,
        InputLangShort: fromShort,
        InputLangLong: fromLong.toLowerCase(),
        InputWort: $input.val(),
        OutputLangShort: toShort,
        OutputLangLong: toLong.toLowerCase(),
        OutputWort: $output.val()
    }

    session.push(karteiKarte);
    console.log(session);
    counter++;

    chrome.storage.local.set({
        session
    }, function () {
        console.log('karteikarte:' + karteiKarte.id + ' - ' + karteiKarte.InputWort + ' is saved');
    });
}

//end of Local Storage Area






//jqstuff 
$(document).ready(function () {
    if ($('.translator').length) {
        translateButtonClick();
    }
    refreshVars();
    storageCheck();
    questionButtonClick();
    closeButtonClick();

    fakeFill();
});




//Fake Stuff

var karteiKarte0 = {
    id: 0,
    InputLangShort: 'de',
    InputLangLong: 'deutsch',
    InputWort: 'Hallo',
    OutputLangShort: 'en',
    OutputLangLong: 'englisch',
    OutputWort: 'Hello'
}
var karteiKarte1 = {
    id: 1,
    InputLangShort: 'de',
    InputLangLong: 'deutsch',
    InputWort: 'Katze',
    OutputLangShort: 'en',
    OutputLangLong: 'englisch',
    OutputWort: 'Cat'
};
var karteiKarte2 = {
    id: 2,
    InputLangShort: 'de',
    InputLangLong: 'deutsch',
    InputWort: 'Auto',
    OutputLangShort: 'en',
    OutputLangLong: 'englisch',
    OutputWort: 'Car'
};
var karteiKarte3 = {
    id: 3,
    InputLangShort: 'de',
    InputLangLong: 'deutsch',
    InputWort: 'Würfel',
    OutputLangShort: 'en',
    OutputLangLong: 'englisch',
    OutputWort: 'Cube'
};
var karteiKarte4 = {
    id: 4,
    InputLangShort: 'de',
    InputLangLong: 'deutsch',
    InputWort: 'Wunderbar',
    OutputLangShort: 'en',
    OutputLangLong: 'englisch',
    OutputWort: 'Wonderful'
};
//fake karteikarten
var fakeFill = function () {
    chrome.storage.local.clear();
    session = [];

    session.push(karteiKarte0, karteiKarte1, karteiKarte2, karteiKarte3, karteiKarte4);

    chrome.storage.local.set({
        session
    }, function () {
        console.log('fake fill done!');
    });

    chrome.storage.local.get(function (cS) {
        console.log(cS.session)
    })
}
