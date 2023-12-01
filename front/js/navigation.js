$(document).ready(function () {
    $('#page-content').empty();

    $('#playlists_restaurants').click(function () {
        removeEventListener();
        $('#page-content').load('templates/playlists_restaurants.html');
    });

    $('#fiche_restaurants').click(function () {
        removeEventListener();
        $('#page-content').load('templates/fiche_restaurants.html');
    });

    $('#geshapon_page_restaurants').click(function () {
        removeEventListener();
        $('#page-content').load('templates/geshapon_page_restaurants.html');
    });

    $('#reconnaissance-objets').click(function () {
        removeEventListener();
        $('#page-content').load('templates/reconnaissance-objets.html');
    });
});


function removeEventListener() {
    var displayFunctionLanguagesChanged = function () {
        filterAndDisplayRestaurants()
    };
    document.getElementById('button_to_english').addEventListener("click", displayFunctionLanguagesChanged);
    document.getElementById('button_to_french').addEventListener("click", displayFunctionLanguagesChanged);

}