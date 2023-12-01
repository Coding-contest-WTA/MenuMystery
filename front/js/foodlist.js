function createFoodlistCard(foodlist, backgroundColor) {
    var foodlistCard = document.createElement("div");
    foodlistCard.className = "card restaurant-card";
    foodlistCard.style.cssText = "background-color: " + backgroundColor + "; margin: 32px 20px; padding: 40px 5px; border-radius: 40px; box-shadow: 12px 12px 5px rgba(234, 224, 236, 0.8);";

    var foodlistNameElement = document.createElement("h2");
    foodlistNameElement.innerHTML = foodlist.name;
    foodlistNameElement.style.fontSize = "40px";

    var dropdownButton = document.createElement("img");
    dropdownButton.src = "../assets/images/display_foodlist.png";
    dropdownButton.alt = valueDependingLanguage("See Restaurants", "Voir Restaurants");
    dropdownButton.style.width = "100px";
    dropdownButton.className = "see-restaurants btn-icon";
    dropdownButton.onclick = function () {
        listRestaurantsInFoodlist(foodlist.foodlist_user_id, foodlistCard);
    };

    var dropdownList = document.createElement("ul");
    dropdownList.className = "dropdown-list";
    dropdownList.id = "dropdown-list-" + foodlist.foodlist_user_id;
    dropdownList.style.fontSize = "30px";

    var deleteButton = document.createElement("img");
    deleteButton.src = "../assets/images/trash.png";
    deleteButton.alt = valueDependingLanguage("Remove Restaurant", "Supprimer Restaurant");
    deleteButton.style.width = "100px";
    deleteButton.style.height = "100px";
    deleteButton.className = "btn-icon";
    deleteButton.onclick = function () {
        deleteRestaurant(foodlist.foodlist_user_id);
    };

    var dropdownContainer = document.createElement("div");
    dropdownContainer.style.display = "flex";
    dropdownContainer.style.alignItems = "center";
    dropdownContainer.appendChild(dropdownButton);
    dropdownContainer.appendChild(dropdownList);

    dropdownContainer.style.marginRight = "auto";

    foodlistCard.appendChild(foodlistNameElement);
    foodlistCard.appendChild(dropdownContainer);
    foodlistCard.appendChild(deleteButton);

    return foodlistCard;
}

function deleteRestaurant(foodlistId) {
    const userId = sessionStorage.getItem("user_id");
    const base64Credentials = sessionStorage.getItem("authorization");


    $.ajax({
        type: "DELETE",
        url: config.apiUrl + "/users/" + userId + "/foodlist/" + foodlistId,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
        },
        success: function () {
            $('#page-content').load('templates/playlists_restaurants.html');
        },
        error: function (data) {
            console.log("Error:", data);
            $("#signupErrorMessage").text("Erreur : " + data.responseJSON.message);
        },
    });

}

function listRestaurantsInFoodlist(foodlistId, foodlistCard) {
    const userId = sessionStorage.getItem("user_id");
    const base64Credentials = sessionStorage.getItem("authorization");

    $.ajax({
        type: "GET",
        url: config.apiUrl + "/users/" + userId + "/foodlist/" + foodlistId,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
        },
        success: function (data) {
            var dropdownListId = "dropdown-list-" + foodlistId;
            var dropdownList = foodlistCard.querySelector("#" + dropdownListId);

            if (!dropdownList) {
                console.log("Dropdown list not found for ID:", dropdownListId);
                return;
            }

            dropdownList.innerHTML = "";

            if (data && data.length > 0) {
                data.forEach(function (restaurant) {
                    var listItem = document.createElement("li");
                    listItem.textContent = restaurant.name + " - " + restaurant.establishment_name;
                    dropdownList.appendChild(listItem);
                });
            } else {
                console.log("Aucun restaurant à afficher");
            }
        },
        error: function (data) {
            console.log("Error:", data);
            $("#signupErrorMessage").text("Erreur : " + data.responseJSON.message);
        },
    });
}

function createFoodList() {
    const userId = sessionStorage.getItem("user_id");
    const base64Credentials = sessionStorage.getItem("authorization");
    const name = document.getElementById("foodlistName").value;
    const restaurantCheckboxes = document.querySelectorAll('input[name="restaurant"]:checked');
    const establishmentsIds = Array.from(restaurantCheckboxes).map(checkbox => checkbox.value);

    $.ajax({
        type: "POST",
        url: config.apiUrl + "/users/" + userId + "/foodlist",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
        },
        data: JSON.stringify({
            "name": name,
            "establishment_ids": establishmentsIds
        }),
        success: function (data) {
            closeModal();
            // location.reload();
            $('#page-content').load('templates/playlists_restaurants.html');
            // You may want to update the UI or perform other actions upon success
        },
        error: function (data) {
            $("#signupErrorMessage").text("Erreur : " + data.responseJSON.message);
        },
    });
}

function closeModal() {
    var modal = document.getElementById("createFoodListModal");
    if (!modal) {
        return;
    }
    modal.style.display = "none";
}

function openModal() {
    var modal = document.getElementById("createFoodListModal");
        if (!modal) {
        return;
    }

    modal.style.display = "block";

    // Fill the restaurant checkboxes when the modal is opened
    getRestaurantListForCheckboxes();
}

function getRestaurantListForCheckboxes() {
    $.ajax({
        type: "GET",
        url: config.apiUrl + "/restaurants",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var checkboxesContainer = document.getElementById("restaurantCheckboxes");

            checkboxesContainer.innerHTML = "";

            if (data && data.length > 0) {
                // Utilisation de Flexbox pour aligner les checkboxes à gauche du texte
                checkboxesContainer.style.display = "flex";
                checkboxesContainer.style.flexDirection = "column";

                data.forEach(function (restaurant) {
                    var checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.name = "restaurant";
                    checkbox.value = restaurant.establishment_id;
                    checkbox.id = "restaurant-" + restaurant.establishment_id;

                    var label = document.createElement("label");
                    label.textContent = restaurant.establishment_name;
                    label.htmlFor = "restaurant-" + restaurant.establishment_id;

                    label.style.fontSize = "40px";
                    label.style.color = "white";

                    checkboxesContainer.appendChild(checkbox);
                    checkboxesContainer.appendChild(label);
                    checkboxesContainer.appendChild(document.createElement("br"));
                });
            } else {
                console.log("Aucun restaurant à afficher");
            }
        },
        error: function (data) {
            console.log("Error:", data);
            $("#signupErrorMessage").text("Erreur : " + data.responseJSON.message);
        },
    });
}

// Call the getRestaurantListForCheckboxes function when the document is ready
$(document).ready(function () {
    autoChangeLanguage()

    const userId = sessionStorage.getItem("user_id");

    if (!userId) {
        document.getElementById("foodlist_list").style.display = "none"
        document.getElementById("modalCreationButton").style.display = "none"
        document.getElementById("createFoodListModal").style.display = "none"

        return;
    }

    document.getElementById("text_page_playlists").style.display = "none"

    const base64Credentials = sessionStorage.getItem("authorization");

    $.ajax({
        type: "GET",
        url: config.apiUrl + "/users/" + userId + "/foodlist",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
        },
        success: function (data) {
            if (data && data.length > 0) {
                var targetElement = $("#foodlist_list");
                data.forEach(function (item, index) {
                    if (item.name) {
                        var backgroundColor = index % 3 === 0 ? "#d1f8c5" : (index % 3 === 1 ? "#fbf9e2" : "#f7dbf2");
                        var foodlistCard = createFoodlistCard(item, backgroundColor);
                        targetElement.append(foodlistCard);
                    }
                });
            } else {
                console.log("Aucune donnée à afficher");
            }
        },
        error: function (data) {
            $("#signupErrorMessage").text("Erreur : " + data.responseJSON.message);
        },
    });
});
