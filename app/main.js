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

var saveSessionButtonClick = function () {
    $('.btn-save').on('click', function () {
        sessionDbHelper.saveSession();
    });
}

var showCurrentSessionClick = function () {
    $('.show-current').on('click', function () {
        sessionDbHelper.refreshView();

    });
}

var clearCurrentSessionClick = function () {
    $('.btn-clear').on('click', function () {
        sessionDbHelper.clearSession();
    });
}


//Question Area
var questionButtonClick = function () {
    var $btnQuestion = $('.btn-question');
    $btnQuestion.on('click', function () {
        sessionDbHelper.refreshView();
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
var fillSession = function () {
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
    saveSessionButtonClick();
    showCurrentSessionClick();
    clearCurrentSessionClick();
    clickHelper.navItemClick()
    // fakeFill();
});


var sessionDbHelper = {
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
        sessionDbHelper.refreshView();
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
        var $translateArea = $('.translator');
        var $questionArea = $('.question');

        $navItems.on('click', function (e) {
            $('.nav__item.is-active').removeClass('is-active');
            $(e.target).addClass('is-active');
            var dataAttr = $(e.target).attr('data-nav-item');
            var activeItem = $('.container').find('.is-active');
            $(activeItem).removeClass('is-active');
            switch(dataAttr) {
                case 'translator':
                    $translateArea.addClass('is-active');
                    break;
                case 'session':
                    $sessionArea.addClass('is-active');
                    sessionDbHelper.refreshView();
                    break;
                case 'question':
                    $questionArea.addClass('is-active');
                    break;
                    
            }
        });

    }
}