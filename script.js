// Oletuksena haetaan reseptin nimen mukaan
let hakutyyppi = "StrMeal"

// API -haku tapahtuu Enter-näppäintä painamalla
$(document).ready(function() {
    $(".hakukentta").keypress(function(e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Estetään lomakkeen oletustoiminta
            const hakusana = $(".hakukentta").val().trim();

            // Hakukentän tarkastus
            if (hakusana === "") {
                alert("The search bar is empty.")
                return;
            }

            // Luodaan URL, jossa on käyttäjän syöte otettu huomioon
            let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + encodeURIComponent(hakusana);

            // Axios-pyyntö
            axios.get(url)
                .then(function(response) {
                    let data = response.data;
                    if (!data.meals) {
                        $("#tulokset").text("No recipes found. Try another recipe name.");
                        return;
                    }

                    // Näytetään hakutulokset div-elementissä
                    $("#tulokset").empty(); // Poistetaan vanhat hakutulokset
                    for (let i = 0; i < data.meals.length; i++) {
                        let meal = data.meals[i];
                        // Luodaan reseptistä korttinäkymä
                        $("#tulokset").append(`
                            <div class = "reseptikortti">
                                <img src = "${meal.strMealThumb}" alt = "${meal.strMeal}">
                                <h3>${meal.strMeal}</h2>
                                <p>Category: ${meal.strCategory}</p>
                                <p>Region: ${meal.strArea}</p>
                            </div>
                        `);
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        console.error(error.response.data);
                        console.error(error.response.status);
                        console.error(error.response.headers);
                    } else if (error.request) {
                        console.error(error.request);
                    } else {
                        console.error("Error", error.message);
                    }
                    $("#tulokset").text("There was an error while fetching recipes. Please try again later.")
                });
    }});
});