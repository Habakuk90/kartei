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
    $questCounter,
    sessionCounter = 1;
    karteiKarte = {},
    session = [];

// Counter for numeration for Cards and marker for existent cards in the storage  
var counter = 0;


// refresh function for the essential variables which are used in every function
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

//translation function which is always fired on button search 
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
        // ready state iteration from 1 to 4 with error handling
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

//overall button action
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
var startButtonClick = function () {
    var $btnStart = $('#question-start');
    $btnStart.on('click', function () {
        $btnStart.removeClass('.active');
        $quest.addClass('is-active');
        fakeFill();
        fillQuestion();


    });
}

var fillQuestion = function () {
    $questCounter = $('.question-counter');
    if (session.length > 0) {

        $questCounter.text(sessionCounter + '/'+ session.length);
        
    } else {
        message('you havent searched something!')
    }
}


//end of Question Area


//Local Storage Area
// function for checking the obj - essential for error handling 
var isEmpty = function (obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}


// storage check will always be fired at the opening sequence in order to get every stored item in the Chrome local storage 
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


// will be fired 
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

    //insert api call to store in database


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
    startButtonClick();

});















// Fake Stuff

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