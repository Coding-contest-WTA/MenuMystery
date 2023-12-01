const initialLanguage = 'en'; // Default language

function updateContent(translations) {
    function updateElementContent(elementId, content) {
        var element = document.getElementById(elementId);
        if (element !== null) {
            element.textContent = content;
        }
    }

    function updateElementAttribute(elementId, attributeName, attributeValue) {
        var element = document.getElementById(elementId);
        if (element !== null) {
            element.setAttribute(attributeName, attributeValue);
        }
    }
    const currentLanguage = sessionStorage.getItem("language")

    // fiche_restaurants
    updateElementAttribute('search_input', 'placeholder', translations[currentLanguage].search_input);
    updateElementContent('filter_type_price', translations[currentLanguage].filter_type_price);
    updateElementContent('filter_price', translations[currentLanguage].filter_price);
    updateElementContent('filter_type_food', translations[currentLanguage].filter_type_food);
    updateElementContent('gashapon_click_text', translations[currentLanguage].gashapon_click_text);
    updateElementContent('categorie_choosen', translations[currentLanguage].categorie_choosen);
    updateElementContent('see_restaurants', translations[currentLanguage].see_restaurants);

    // playlist_restaurants
    updateElementContent('text_page_playlists', translations[currentLanguage].text_page_playlists);
    updateElementContent('create_list_text', translations[currentLanguage].create_list_text);
    updateElementContent('name_list_text', translations[currentLanguage].name_list_text);
    updateElementContent('restaurants_to_add_txt', translations[currentLanguage].restaurants_to_add_txt);
    updateElementContent('button_foodlists', translations[currentLanguage].button_foodlists);
    updateElementContent('create_new_list_txt', translations[currentLanguage].create_new_list_txt);

    // reconnaissance-objets
    updateElementContent('ouvrirReconnaissance', translations[currentLanguage].ouvrirReconnaissance);
    updateElementContent('ouvrirChopsTrain', translations[currentLanguage].ouvrirChopsTrain);
    updateElementContent('startButton', translations[currentLanguage].startButton);
    updateElementContent('text_reco_text_1', translations[currentLanguage].text_reco_text_1);
    updateElementContent('text_reco_text_2', translations[currentLanguage].text_reco_text_2);
    updateElementContent('text_reco_text_3', translations[currentLanguage].text_reco_text_3);
    updateElementContent('infoContainer_txt_1', translations[currentLanguage].infoContainer_txt_1);
    updateElementContent('infoContainer_txt_2', translations[currentLanguage].infoContainer_txt_2);
    updateElementContent('infoContainer_txt_3', translations[currentLanguage].infoContainer_txt_3);
    updateElementContent('infoContainer_txt_4', translations[currentLanguage].infoContainer_txt_4);
    updateElementContent('infoContainer_txt_5', translations[currentLanguage].infoContainer_txt_5);
    updateElementContent('now_you_play_txt', translations[currentLanguage].now_you_play_txt);
    updateElementContent('startButtonChop', translations[currentLanguage].startButtonChop);
    updateElementContent('text_reco2_txt_1', translations[currentLanguage].text_reco2_txt_1);
    updateElementContent('text_reco2_txt_2', translations[currentLanguage].text_reco2_txt_2);
    updateElementContent('text_reco2_txt_3', translations[currentLanguage].text_reco2_txt_3);

    // Header
    updateElementContent('connexion_menu_txt', translations[currentLanguage].connexion_menu_txt);
    updateElementContent('deconnexion_menu_txt', translations[currentLanguage].deconnexion_menu_txt);
    updateElementContent('connexion_form_login_txt', translations[currentLanguage].connexion_form_login_txt);
    updateElementContent('login_form_username', translations[currentLanguage].login_form_username);
    updateElementContent('login_form_password', translations[currentLanguage].login_form_password);
    updateElementContent('login_form_connexion_button', translations[currentLanguage].login_form_connexion_button);
    updateElementContent('no_account_txt', translations[currentLanguage].no_account_txt);
    updateElementContent('no_account_signup', translations[currentLanguage].no_account_signup);
    updateElementContent('connexion_form_signup_txt', translations[currentLanguage].connexion_form_signup_txt);
    updateElementContent('signup_form_username', translations[currentLanguage].signup_form_username);
    updateElementContent('signup_form_password', translations[currentLanguage].signup_form_password);
    updateElementContent('signup_form_connexion_button', translations[currentLanguage].signup_form_connexion_button);
    updateElementContent('already_account_txt', translations[currentLanguage].already_account_txt);
    updateElementContent('already_account_signup', translations[currentLanguage].already_account_signup);
    updateElementContent('button_to_english', translations[currentLanguage].button_to_english);
    updateElementContent('button_to_french', translations[currentLanguage].button_to_french);
}

function switchLanguageEnglish() {
    sessionStorage.setItem("language", "en")
    changeLanguage();
}

function switchLanguageFrench() {
    sessionStorage.setItem("language", "fr")
    changeLanguage();
}

function valueDependingLanguage(valueLangue1, valueLangue2) {
    if (sessionStorage.getItem("language") === "en") {
        return valueLangue1
    }

    return valueLangue2
}

function changeLanguage() {
    // Load translations from JSON file
    fetch('translations.json')
        .then(response => response.json())
        .then(translations => {
            // Initial content update
            updateContent(translations);
        })
        .catch(error => console.error('Error loading translations:', error));
}

$(document).ready(function () {
    autoChangeLanguage()
});

function autoChangeLanguage() {
    const savedLanguage = sessionStorage.getItem("language");
    if (!savedLanguage) {
        sessionStorage.setItem("language", initialLanguage)
    }

    changeLanguage()
}