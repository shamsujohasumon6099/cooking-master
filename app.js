document.getElementById('submit').addEventListener('click', function () {
    const foodName = document.getElementById('foodName').value;
    getFood(`${foodName}`);
})

const getFood = food => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`;
    fetch(url)
        .then(response => response.json())
        .then(data => findFood(data))

}

const findFood = foods => {
    const showFoods = document.getElementById('showFoods');
    const food = foods.meals;
    for (let i = 0; i < food.length; i++) {
        const meal = food[i];

        const showFoodDiv = document.createElement('div');
        showFoodDiv.className = 'showFoodDiv';
        const showFoodInfo = `
            <div onclick="foodDetails('${meal.idMeal}')" class="card bg-warning" style="width: 18rem;">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="..." width="18rem">
                <div class="card-body">
                <h5 class="card-title"><strong>${meal.strMeal}</strong></h5>
                
                <ul>
                    <li><strong>Area :</strong> ${meal.strArea}</li>
                    <li><strong>Catagory :</strong> ${meal.strCategory}</li>
                <ul><br>
                <a href="#" class="btn btn-dark">Go somewhere</a>
            </div>
        </div> 
        `
        showFoodDiv.innerHTML = showFoodInfo;
        showFoods.appendChild(showFoodDiv);
        document.getElementById('foodName').value = '';



    }
}


const foodDetails = foodId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`)
        .then(response => response.json())
        .then(data => displayIngredients(data))
}


const displayIngredients = ingredients => {
    const meal = ingredients.meals[0];
    const foodDetails = document.getElementById('foodDetails');
    foodDetails.innerHTML = `
            <div class="card bg-warning justify-content-center" style="width: 644px;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="..." id="img-style">
            <div class="card-body">
                <h1 class="card-title">${meal.strMeal}</h1>
                <hr>
                <h3 class="card-text">Meal Ingredients : </h3>
            </div>
            <ul class="list-group list-group-flush bg-warning " id="listItem">
            </ul>
        </div>
    `
    console.log(meal);
    const ul = document.getElementById('listItem');
    ul.classList = ('list-group','list-group-flush');
    for (let i = 1; meal[`strIngredient${i}`]; i++) {
        const li = document.createElement('li');
        li.innerText =  `${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`
        ul.appendChild(li);
        console.log(meal[`strIngredient${i}`]);

    }
}
