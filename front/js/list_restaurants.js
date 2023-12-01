function createRestaurantCard(restaurantData, index) {
    var restaurantCard = document.createElement("div");
    restaurantCard.className = "card restaurant-card";
    restaurantCard.style.cssText = "background-color: " + getBackgroundColor(index) + ";";

    var infoContainer = document.createElement("div");
    infoContainer.className = "info-container"; // Add a class for styling

    var restaurantImageContainer = document.createElement("div");
    restaurantImageContainer.className = "restaurant-image-container";

    var textContainer = document.createElement("div");
    textContainer.className = "text-container";

    const textNom = valueDependingLanguage("Name", "Nom")
    const textDescription = valueDependingLanguage("Description", "Description")
    const textPrice = valueDependingLanguage("Price", "Prix")
    const textSchedule = valueDependingLanguage("Schedule", "Horaires")
    const textWebsite = valueDependingLanguage("Website", "Site Web")

    const restoDescription = valueDependingLanguage(restaurantData.establishment_description_eng, restaurantData.establishment_description)

    var restaurantNameElement = document.createElement("h2");
    restaurantNameElement.textContent = textNom + " : " + restaurantData.establishment_name;

    var descriptionElement = createInfoElement(textDescription, restoDescription);
    var priceElement = createInfoElement(textPrice, restaurantData.price);
    var hoursElement = createInfoElement(textSchedule, formatHours(restaurantData.establishment_opening, restaurantData.establishment_closure));

    var restaurantImage = document.createElement("img");
    restaurantImage.className = "restaurant-image";
    restaurantImage.src = "../assets/resto_plats/" + restaurantData.establishment_name + ".jpg";
    restaurantImage.style.width = "80%";
    restaurantImageContainer.appendChild(restaurantImage);

    textContainer.appendChild(restaurantNameElement);
    textContainer.appendChild(descriptionElement);
    textContainer.appendChild(priceElement);
    textContainer.appendChild(hoursElement);

    var urlElement = document.createElement("a");
    urlElement.href = restaurantData.url;
    urlElement.textContent = textWebsite;
    urlElement.style.fontSize = "20px";
    urlElement.style.color = "dodgerblue";
    urlElement.style.textAlign = "center";

    textContainer.appendChild(urlElement);

    infoContainer.appendChild(restaurantImageContainer);
    infoContainer.appendChild(textContainer);

    restaurantCard.appendChild(infoContainer);

    return restaurantCard;
}

function createInfoElement(label, value) {
    var element = document.createElement("p");
    element.innerHTML = "<strong>" + label + ":</strong> " + value;
    element.style.fontSize = "20px";
    return element;
}

function formatHours(opening, closure) {
    return opening + " - " + closure;
}

function getBackgroundColor(index) {
    return index % 3 === 0 ? "#d1f8c5" : (index % 3 === 1 ? "#fbf9e2" : "#f7dbf2");
}

$(document).ready(function () {
    autoChangeLanguage()

    if (sessionStorage.getItem("fiche_restaurants_display") !== "false") {
        $.ajax({
            type: "GET",
            url: config.apiUrl + "/restaurants",
            dataType: "json",
            success: function (data) {
                if (data && data.length > 0) {
                    var targetElement = $("#nomsResto");
                    targetElement.empty();
                    data.forEach(function (item, index) {
                        if (item.establishment_name) {
                            var restaurantCard = createRestaurantCard(item, index);
                            targetElement.append(restaurantCard);
                        }
                    });
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

    sessionStorage.removeItem("fiche_restaurants_display")
});


// when language changed: then we reload the page. Filters are saved.
var displayFunctionLanguagesChanged = function () {
    filterAndDisplayRestaurants()
};
document.getElementById('button_english').addEventListener("click", displayFunctionLanguagesChanged);
document.getElementById('button_french').addEventListener("click", displayFunctionLanguagesChanged);

