$(document).ready(function () {
    $('#page-content').empty();

    $('#playlists_restaurants').click(function () {
        $('#page-content').load('templates/playlists_restaurants.html');
    });

    $('#fiche_restaurants').click(function () {
        $('#page-content').load('templates/fiche_restaurants.html');
    });

    $('#geshapon_page_restaurants').click(function () {
        $('#page-content').load('templates/geshapon_page_restaurants.html');
    });

    $('#reconnaissance-objets').click(function () {
        $('#page-content').load('templates/reconnaissance-objets.html');
    });
});
