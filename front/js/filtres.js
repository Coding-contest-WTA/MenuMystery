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
        const checkbox = document.getElementById(checkboxId)
        if (checkbox.checked) {
            foodValues.push(checkbox.value);
        }
    });

    priceCheckboxes.forEach(function(checkboxId) {
        const checkbox = document.getElementById(checkboxId)
        if (checkbox.checked) {
            priceValues.push(checkbox.value);
        }
    });

    return { food: foodValues, price: priceValues };
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

    displayRestaurant(url)
}

document.getElementById("filter_type_price").onclick = function () {
    filterAndDisplayRestaurants();
};

document.getElementById("search-input").onchange = function () {
    const url = config.apiUrl + "restaurants?establishment_name=" + this.value
    displayRestaurant(url)
};

document.getElementById("search-button").onclick = function () {
    const url = config.apiUrl + "restaurants?establishment_name=" + document.getElementById("search-input").value
    displayRestaurant(url)
}

function displayRestaurant(url) {
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