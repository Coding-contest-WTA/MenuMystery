var imageSets = [
    [
        '../../assets/images/gesh_lum1.jpg',
        '../../assets/images/gesh_lum2.jpg',
        '../../assets/images/gesh_lum3.jpg'
    ]
];
var image4Set = ['../../assets/images/gesh_bout.jpg'];
var displayInterval = 10;
var imgElement = document.getElementById('displayedImage');
var setIndex = 0;
var index = 0;
var changeImage = true;

setInterval(() => {
    if (changeImage) {
        index = (index + 1) % imageSets[setIndex].length;
        imgElement.src = imageSets[setIndex][index];
    }
}, displayInterval);

function handleImageClick() {
    if (changeImage) {
        imgElement.src = (imgElement.src === image4Set[0]) ? imageSets[setIndex][index] : image4Set[0];
        changeImage = false;
        setTimeout(() => {
            changeImage = true;
        }, 3000);

        $.ajax({
        type: "GET",
        url: config.apiUrl + "/food/choose",
        dataType: "json",
        success: function (data) {
            if (data && data.length > 0) {
                document.getElementById("displayTypeText").innerText = data[0].type;
            } else {
                console.log("Aucune donnée à afficher");
            }
        },
        error: function (data) {
            console.error("Erreur lors de la requête AJAX : " + data);
            $("#errorMessage").text("Erreur : " + data.statusText);
        },
    });

    }
}

imgElement.onclick = handleImageClick;

window.addEventListener('beforeunload', () => {
    changeImage = true;
});

// retour page menu
var returnButton = document.getElementById('returnButton');
returnButton.addEventListener('click', function () {
    imgElement.onclick = null;
    var footer = document.getElementById("footer");
    var bd_footer = document.getElementById("bd_footer");
    $('#page-content').load('templates/fiche_restaurants.html', function () {
        imgElement.onclick = handleImageClick;
        $('#header, #footer, #bd_footer, #search-container, .large-button1, .large-button2, .large-button3, .large-button4').show();
        $('#overlay').show();
        bd_footer.style.height = "29%";
    });

});

function redirectAndDisplayRestaurants(){
    const type = document.getElementById("displayTypeText").innerText;
    $('#page-content').load('templates/fiche_restaurants.html', function () {
        imgElement.onclick = handleImageClick;
        $('#header, #footer, #bd_footer, #search-container, .large-button1, .large-button2, .large-button3, .large-button4').show();
        $('#overlay').show();
        bd_footer.style.height = "29%";

        url = config.apiUrl + "/restaurants?type=" + type
        displayRestaurant(url)

    });
}
