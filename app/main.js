//translation Area
var $input,
    $output,
    $searchInputSelect,
    $searchOutputSelect,
    $quest,
    $translator,
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
    sessionCounter = 1,
    askMeLater = 5,
    isInit = false;
var karteiKarte = {},
    session = [],
    arrTemp = [],
    arrRight = [],
    arrWrong = [];

// Counter for numeration for Cards and marker for existent cards in the storage  
var counter = 0;

//jqstuff 
$(document).ready(function () {
    if ($('.translator').length) {
        translateButtonClick();
    }
    refreshVars();
    storageCheck();
    saveSessionButtonClick();
    showCurrentSessionClick();
    clearCurrentSessionClick();
    clickHelper.navItemClick();
    questionPopUp.closeButton();
    questionPopUp.startButton();
    questionSubmitBtn();
    questionTabBtn();
    questionNoCards();
    if (session.length > askMeLater) {
        $('.translator-popup').addClass('active');
    }
});

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
    $translator = $('.translator');

}

//translation function which is always fired on button search 
var translateRequest = function () {
    var xhr = new XMLHttpRequest();

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
                    fill.session();
                    fill.storage();
                    if (session.length >= askMeLater) {
                        $('.translator-popup').addClass('active');
                    }
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

var saveSessionButtonClick = function () {
    $('.btn-save').on('click', function () {
        sessionViewHelper.saveSession();
    });
}

var showCurrentSessionClick = function () {
    $('.show-current').on('click', function () {
        sessionViewHelper.refreshView();
    });
}

var clearCurrentSessionClick = function () {
    $('.btn-clear').on('click', function () {
        sessionViewHelper.clearSession();
    });
}

var questionSubmitBtn = function () {
    $('#questionInputBtn').on('click', function () {

        question.awnser();
        $('#questionInput').val('');
        $('#questionInput').focus();
    });
}

var questionTabBtn = function () {
    $('#question-tab').on('click', function () {
        if (session.length > 0) {

            question.init();
        } else {
            $('.question-popup').addClass('active');
        }
    });
};

var questionNoCards = function () {
    $('.question-popup button').on('click', function () {
        $('.question-popup').removeClass('active');
        $('nav').find('li.is-active').removeClass('is-active');
        $('nav').find('*[data-nav-item="translator"]').addClass('is-active');
        $quest.removeClass('is-active');
        $translator.addClass('is-active');
    });

};




//Question Area

var questionPopUp = {
    closeButton: function () {
        var $btnClose = $('#question-later');
        $btnClose.on('click', function () {
            $('.translator-popup').removeClass('active');
            askMeLater += 5;
        });
    },

    startButton: function () {
        var $btnStart = $('#question-start');
        $btnStart.on('click', function () {
            $('.translator-popup').removeClass('active');
            $btnStart.removeClass('active');

            question.init();
        });
    }
};

var question = {

    fillPlaceholder: function () {

        if (session.length > 0) {
            arrTemp.push(session[0]);

            $('.questInputWord').html(arrTemp[0].InputWort);
            $('.questOutputLang').html(arrTemp[0].OutputLangLong);

            question.counter();
        } else {
            console.log(session.length, 'keine Karteikarten');
            $('.question-popup').addClass('active');
        }
    },

    counter: function () {
        $questCounter = $('.question-counter');
        if (session.length > 0) {

            $questCounter.html('noch ' + session.length + ' verbleibend');

        } else {
            $questCounter.html('es sind keine Karteikarten mehr verfügbar!');
        }
    },

    awnser: function () {
        if (session.length > 0) {
            var $FC = $('.flip-container');
            var $QAR = $('.question-awnser-right');
            var $QAW = $('.question-awnser-wrong');

            var input = $('#questionInput').val();
            if (input.toLowerCase() === arrTemp[0].OutputWort.toLowerCase()) {
                arrRight.push(arrTemp[0]);

                flipCard.right();

            } else {
                arrWrong.push(arrTemp[0]);
                flipCard.wrong();
            }
            setTimeout(flipCard.clear, 2000);
            arrTemp = [];
            session.splice(0, 1);

            question.fillPlaceholder();

        } else {
            $('.question-popup').addClass('active');
        }

    },

    init: function () {

        sessionViewHelper.refreshView();
        question.counter();
        $('nav').find('li.is-active').removeClass('is-active');
        $translator.removeClass('is-active');
        $('nav').find('*[data-nav-item="question"]').addClass('is-active');
        $quest.addClass('is-active');

        question.fillPlaceholder();
        $('#questionInput').focus();
    },

    fake: function () {
        fakeFill();
        question.init();
    },
    check: function () {
        console.log(session, session.length);
        chrome.storage.local.get(function (cS) {
            console.log(cS.session)
        });
    },

    clear: function () {
        session = [];
        chrome.storage.local.clear();
    }
}

//end of Question Area


//
var flipCard = {
    right: function () {
        var $FC = $('.flip-container');
        var $QAR = $('.question-awnser-right');
        $QAR.addClass('awnser-flip');
        $FC.removeClass('papa-unflip').addClass('papa-flip');
        console.info('correct! :)');

    },

    wrong: function () {
        var $FC = $('.flip-container');

        var $QAW = $('.question-awnser-wrong');
        $QAW.addClass('awnser-flip');
        $FC.removeClass('papa-unflip').addClass('papa-flip');
        console.info('wrong! :(');
    },

    clear: function () {
        var $FC = $('.flip-container');
        var $QAR = $('.question-awnser-right');
        var $QAW = $('.question-awnser-wrong');

        $FC.removeClass('papa-flip').addClass('papa-unflip');
        
        $QAR.removeClass('awnser-flip');
        $QAW.removeClass('awnser-flip');
    }

}

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
                counter++;
            }

        } else {
            console.info('Chrome Local Storage is empty!');
        }
    });
}


// will be fired 
var fill = {

    session: function () {
        // var session = [];
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

        //insert api call to store in database
    },
    storage: function () {
        chrome.storage.local.set({
            session
        }, function () {
            console.log('karteikarte:' + karteiKarte.id + ' - ' + karteiKarte.InputWort + ' is saved');
        });
    }

}
//end of Local Storage Area


var sessionViewHelper = {
    refreshView: function () {
        chrome.storage.local.get(function (cS) {
            var $listContainer = $('.session-list');
            var sessionListItems = $listContainer.children();
            $(sessionListItems).each(function (index, listItem) {
                $(listItem).html('');
                if (cS.session && cS.session.length > index) {
                    $(listItem).html(cS.session[index].InputWort + ' - ' + cS.session[index].OutputWort);
                }
            });
        });
    },

    clearSession: function () {
        chrome.storage.local.clear();
        session = [];
        sessionViewHelper.refreshView();
    },

    saveSession: function () {
        chrome.storage.local.get(function (cS) {
            $.ajax({
                type: 'POST',
                data: JSON.stringify(cS.session),
                url: 'http://localhost:55845/api/session/create',
                // url: 'http://local.karteikarten.de/api/session/create',
                contentType: 'application/json',
                success: function (a) {
                    console.log(a);
                }
            });
        });
    }
}


var clickHelper = {
    navItemClick: function () {
        var $navItems = $('.nav__item');
        var $sessionArea = $('.session');
        $navItems.on('click', function (e) {
            var dataAttr = $(e.target).attr('data-nav-item');
            var activeItem = $('.container').find('.is-active');
            $('.nav__item.is-active').removeClass('is-active');
            $(e.target).addClass('is-active');
            $(activeItem).removeClass('is-active');
            switch (dataAttr) {
                case 'translator':
                    $translator.addClass('is-active');
                    break;
                case 'session':
                    $sessionArea.addClass('is-active');
                    sessionViewHelper.refreshView();
                    break;
                case 'question':
                    $quest.addClass('is-active');
                    break;
            }
        });
    }
}

// Fake Stuff

var fakeFill = function () {
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