document.getElementById("filter-button").onclick = function() {
    var dropdown = document.getElementById("filter-dropdown");
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
};

function getCheckedValues() {
    var foodValues = [];
    var priceValues = [];

    if (document.getElementById("ramenCheckbox").checked) {
        foodValues.push("ramen");
    }
    if (document.getElementById("sushiCheckbox").checked) {
        foodValues.push("sushi");
    }
    if (document.getElementById("donburiCheckbox").checked) {
        foodValues.push("donburi");
    }

    if (document.getElementById("5-10Checkbox").checked) {
        priceValues.push("5-10");
    }
    if (document.getElementById("10-20Checkbox").checked) {
        priceValues.push("10-20");
    }
    if (document.getElementById("20-30Checkbox").checked) {
        priceValues.push("20-30");
    }
    if (document.getElementById("50-70Checkbox").checked) {
        priceValues.push("50-70");
    }
}