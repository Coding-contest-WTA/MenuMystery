function createFoodlistCard(foodlist, backgroundColor) {
    var foodlistCard = document.createElement("div");
    foodlistCard.className = "card restaurant-card";
    foodlistCard.style.cssText = "background-color: " + backgroundColor + ";";

    var foodlistNameElement = document.createElement("h2");
    foodlistNameElement.textContent = "Nom : " + foodlist.name;

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer Restaurant";
    deleteButton.className = "btn btn-danger";
    deleteButton.onclick = function () {
        // Call the function to list restaurants in the foodlist
        deleteRestaurant(foodlist.foodlist_user_id);
    };

    var dropdownButton = document.createElement("button");
    dropdownButton.textContent = "Voir Restaurants";
    dropdownButton.className = "btn btn-primary";
    dropdownButton.onclick = function () {
        // Call the function to list restaurants in the foodlist
        listRestaurantsInFoodlist(foodlist.foodlist_user_id, foodlistCard);
    };

    var dropdownList = document.createElement("ul");
    dropdownList.className = "dropdown-list";
    dropdownList.id = "dropdown-list-" + foodlist.foodlist_user_id;

    foodlistCard.appendChild(foodlistNameElement);
    foodlistCard.appendChild(deleteButton);
    foodlistCard.appendChild(dropdownButton);
    foodlistCard.appendChild(dropdownList);

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
                data.forEach(function (restaurant) {
                    var checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.name = "restaurant";
                    checkbox.value = restaurant.establishment_id;
                    checkbox.id = "restaurant-" + restaurant.establishment_id;

                    var label = document.createElement("label");
                    label.textContent = restaurant.name + " - " + restaurant.establishment_name
                    label.htmlFor = "restaurant-" + restaurant.establishment_id;

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
