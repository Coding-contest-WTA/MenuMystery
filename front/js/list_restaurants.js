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

    var restaurantNameElement = document.createElement("h2");
    restaurantNameElement.textContent = "Nom : " + restaurantData.establishment_name;

    var descriptionElement = createInfoElement("Description", restaurantData.establishment_description);
    var priceElement = createInfoElement("Prix", restaurantData.price);
    var hoursElement = createInfoElement("Horaires", formatHours(restaurantData.establishment_opening, restaurantData.establishment_closure));

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
    urlElement.textContent = "Site Web";
    urlElement.style.fontSize = "20px";
    urlElement.style.color = "deepskyblue";
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
    if (sessionStorage.getItem("fiche_restaurants_display") !== "false") {

        console.log("displayed");

        $.ajax({
            type: "GET",
            url: config.apiUrl + "/restaurants",
            dataType: "json",
            success: function (data) {
                if (data && data.length > 0) {
                    var targetElement = $("#nomsResto");
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
