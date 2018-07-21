// Window on load event listener
window.addEventListener("load", function () {

    // Get both selects
    var categorySelect = document.getElementById("category");
    var subCategorySelect = document.getElementById("sub-category");

    // Add on change event listener to the first select
    categorySelect.addEventListener("change", function () {

        // Declare new XHR
        var httpRequest = new XMLHttpRequest();

        // XHR on state change listener
        httpRequest.onreadystatechange = function () {

            // If request is done
            if (httpRequest.readyState === XMLHttpRequest.DONE) {

                // If the request completed successfully
                if (httpRequest.status === 200) {

                    // Remove all options currently in the second select
                    while (subCategorySelect.firstChild) {
                        subCategorySelect.removeChild(subCategorySelect.firstChild);
                    }

                    // Get response text and parse the json string
                    var response = JSON.parse(httpRequest.responseText);

                    // Add new options to the second select
                    response.forEach(function (element) {

                        // Create new option element
                        var option = document.createElement("option");
                        option.setAttribute("value", element.id);
                        option.innerText = element.name;

                        // Append the option to the second select
                        subCategorySelect.appendChild(option);
                    });
                } else {
                    alert('There was a problem with the request.');
                }
            }
        };

        // Specify XHR request method, URL and headers
        httpRequest.open("POST", "database.php");
        httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // Data to send
        httpRequest.send('category=' + encodeURIComponent(categorySelect.value));
    });
});