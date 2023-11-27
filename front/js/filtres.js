document.getElementById("filter-button").onclick = function() {
    var dropdown = document.getElementById("filter-dropdown");
    var overlay = document.getElementById("overlay-filter");

    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
        overlay.style.display = 'none';
    } else {
        overlay.style.display = 'block';
        dropdown.style.display = 'block';
    }
};

function closeFilters() {
    const filters = document.getElementById('filter-dropdown');
    var overlay = document.getElementById("overlay-filter");
    filters.style.display = 'none';
    overlay.style.display = 'none';
}

function getCheckedValues() {
    var foodValues = [];
    var priceValues = [];
    var foodCheckboxes = [
        "ramenCheckbox", "sushiCheckbox", "donburiCheckbox",
        "sauteCheckbox", "CurryCheckbox", "GyozasCheckbox",
        "BentosCheckbox", "OkonomiyakiCheckbox",
        "SobaCheckbox", "UdonCheckbox", "OmuriceCheckbox",
        "VégétarienCheckbox", "ThéCheckbox",
        "DorayakiCheckbox", "DaifukuCheckbox", "MelonpanCheckbox"
    ];

    var priceCheckboxes = ["5-10Checkbox", "10-20Checkbox", "20-30Checkbox", "50-70Checkbox"];

    foodCheckboxes.forEach(function(checkboxId) {
        if (document.getElementById(checkboxId).checked) {
            foodValues.push(checkboxId.replace("Checkbox", "").toLowerCase());
        }
    });

    priceCheckboxes.forEach(function(checkboxId) {
        if (document.getElementById(checkboxId).checked) {
            priceValues.push(checkboxId.replace("Checkbox", ""));
        }
    });

    return { food: foodValues, price: priceValues };
}

function createRestaurantCard(restaurantData, index) {
    var restaurantCard = document.createElement("div");
    restaurantCard.className = "card restaurant-card";
    restaurantCard.style.cssText = "background-color: " + getBackgroundColor(index) + ";";
    var infoContainer = document.createElement("div");
    infoContainer.className = "info-container";
    var restaurantImageContainer = document.createElement("div");
    restaurantImageContainer.className = "restaurant-image-container";
    var restaurantImage = document.createElement("img");
    restaurantImage.className = "restaurant-image";
    restaurantImage.src = "../assets/resto_plats/restaurant" + index + ".jpg";
    restaurantImage.style.width = "80%";
    restaurantImageContainer.appendChild(restaurantImage);
    var textContainer = document.createElement("div");
    textContainer.className = "text-container";
    var restaurantNameElement = document.createElement("h2");
    restaurantNameElement.textContent = "Nom : " + restaurantData.establishment_name;
    var descriptionElement = createInfoElement("Description", restaurantData.establishment_description);
    var priceElement = createInfoElement("Prix", restaurantData.price);
    var hoursElement = createInfoElement("Horaires", formatHours(restaurantData.establishment_opening, restaurantData.establishment_closure));
    textContainer.appendChild(restaurantNameElement);
    textContainer.appendChild(descriptionElement);
    textContainer.appendChild(priceElement);
    textContainer.appendChild(hoursElement);
    var urlElement = document.createElement("a");
    urlElement.href = restaurantData.url;
    urlElement.textContent = "Site Web";
    urlElement.style.fontSize = "20px";
    urlElement.style.color = "blue";
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
    return index % 3 === 0 ? "#E7FBE1" : (index % 3 === 1 ? "#F5F5F5" : "#FBE8FC");
}

function filterAndDisplayRestaurants() {
    var checkedValues = getCheckedValues();
    console.log(checkedValues);

    var foodValues = checkedValues.food;
    var priceValues = checkedValues.price;
    var map = [];

    if (foodValues.length > 0) {
        map.push("type=" + foodValues.join("&type="));
    }
    if (priceValues.length > 0) {
        map.push("price=" + priceValues.join("&price="));
    }

    var queryes = map.join("&");
    var url = config.apiUrl + "/restaurants";
    if (queryes !== "") {
        url = config.apiUrl + "/restaurants?" + queryes;
    }

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (data) {
            var targetElement = $("#nomsResto");

            targetElement.empty();

            if (data && data.length > 0) {
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

document.getElementById("filter_type_price").onclick = function () {
    filterAndDisplayRestaurants();
};
