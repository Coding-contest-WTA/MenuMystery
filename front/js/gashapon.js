window.myApp = {}; //éviter la déclaration multiple

window.myApp.lumImages = [
    '../../assets/images/gesh_lum1.jpg',
    '../../assets/images/gesh_lum2.jpg',
    '../../assets/images/gesh_lum3.jpg'
];

window.myApp.moveImages = [
    '../../assets/images/gesh_bout.jpg',
    '../../assets/images/gesh_move1.jpg',
    '../../assets/images/gesh_move2.jpg',
    '../../assets/images/gesh_move3.jpg',
    '../../assets/images/gesh_move4.jpg',
    '../../assets/images/gesh_move1.jpg',
    '../../assets/images/gesh_move2.jpg',
    '../../assets/images/gesh_move3.jpg',
    '../../assets/images/gesh_move4.jpg',
    '../../assets/images/gesh_move1.jpg',
    '../../assets/images/gesh_move2.jpg',
    '../../assets/images/gesh_move3.jpg',
    '../../assets/images/gesh_move4.jpg',
    '../../assets/images/gesh_boule_on.jpg',
    '../../assets/images/gesh_boule_ok.jpg'
];

window.myApp.currentIndex = 0;
window.myApp.intervalId;
window.myApp.imgElement = document.getElementById('imageDisplay');
window.myApp.changeImage = true;

function startImageCarousel(images, delay) {
    window.myApp.intervalId = setInterval(function () {
        window.myApp.imgElement.src = images[window.myApp.currentIndex];
        window.myApp.currentIndex = (window.myApp.currentIndex + 1) % images.length;
    }, delay);
}

function changeImageFunction() {
    clearInterval(window.myApp.intervalId);
    let moveIndex = 0;
    window.myApp.intervalId = setInterval(function () {
        window.myApp.imgElement.src = window.myApp.moveImages[moveIndex];
        moveIndex++;
        if (moveIndex === window.myApp.moveImages.length) {
            clearInterval(window.myApp.intervalId);
        }
    }, 200);
}

startImageCarousel(window.myApp.lumImages, 200);

function handleImageClick() {
    if (window.myApp.changeImage) {
        changeImageFunction();
        window.myApp.changeImage = false;
        setTimeout(() => {
            window.myApp.changeImage = true;
        }, 3000);

        $.ajax({
            type: "GET",
            url: config.apiUrl + "/food/choose",
            dataType: "json",
            success: function (data) {
                if (data && data.length > 0) {
                    setTimeout(function () {
                        document.getElementById("displayTypeText").innerText = data[0].type;
                        document.getElementById("displayTypeText").style.color = "white";
                        document.getElementById("displayTypeText").style.fontWeight = "bold";
                        document.getElementById("displayTypeText").style.fontSize = "80px";
                        document.getElementById("redirection").style.display = 'block';
                        document.getElementById('filterRestoBut').style.display = 'block';
                    }, 5000);
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

window.myApp.imgElement.onclick = handleImageClick;

window.addEventListener('beforeunload', () => {
    window.myApp.changeImage = true;
});

var returnButton = document.getElementById('returnButton');
returnButton.addEventListener('click', function () {
    window.myApp.imgElement.onclick = null;
    var footer = document.getElementById("footer");
    var bd_footer = document.getElementById("bd_footer");
    $('#page-content').load('templates/fiche_restaurants.html', function () {
        window.myApp.imgElement.onclick = handleImageClick;
        $('#header, #footer, #bd_footer, #search-container, .large-button1, .large-button2, .large-button3, .large-button4').show();
        $('#overlay').show();
        bd_footer.style.height = "29%";
        toggleFooter();
    });
});

function redirectAndDisplayRestaurants() {
    const type = document.getElementById("displayTypeText").innerText;

    sessionStorage.setItem("fiche_restaurants_display", "false");

    $('#page-content').load('templates/fiche_restaurants.html', function () {
        window.myApp.imgElement.onclick = handleImageClick;
        $('#header, #footer, #bd_footer, #search-container, .large-button1, .large-button2, .large-button3, .large-button4').show();
        $('#overlay').show();
        bd_footer.style.height = "29%";

        toggleFooter()
        url = config.apiUrl + "/restaurants?type=" + type;
        displayRestaurant(url);
    });
}
