const UpVote = 'upVote';

class Recipes {
    socket;
    recipes;
    userNameEl;

    constructor() {
        const userNameEl = document.querySelector('.user-name');
        userNameEl.textContent = this.getUserName() + ' ' + userNameEl.textContent;
        this.recipes = [];

        this.configureWebSocket();
    }

    init(breakfastData, lunchData, dinnerData) {
        this.generateTable(breakfastData, 'breakfast-table');
        this.generateTable(lunchData, 'lunch-table');
        this.generateTable(dinnerData, 'dinner-table');
    }

    getUserName() {
        return localStorage.getItem('userName') ?? 'UserName';
    }

    showModal() {
        const modalEl = document.querySelector('#myModal');
        const modal = new bootstrap.Modal(modalEl);
        modalEl.show()
    }

    showInstructionsModal(instructions) {
        const modalEl = document.querySelector('#instructionsModal');
        const modalBody = modalEl.querySelector('.modal-body');
        modalBody.textContent = instructions;

        const modal = new bootstrap.Modal(modalEl);
        modal.show()
    }

    submitRecipe() {
        const mealType = document.getElementById('mealType').value;
        const mealTitle = document.getElementById('mealTitle').value;
        const ingredients = document.getElementById('ingredients').value;
        const perServing = {
            calories: document.getElementById('caloriesPerServing').value,
            protein: document.getElementById('proteinPerServing').value,
            fat: document.getElementById('fatPerServing').value,
            carbs: document.getElementById('carbsPerServing').value,
        };
        const instructions = document.getElementById('instructions').value;
        const reviewsLink = 'reviews.html';
        const votes = 0;

        const newRecipe = {
            mealType,
            mealTitle,
            ingredients,
            perServing,
            instructions,
            reviewsLink,
            votes
        };
        
        this.saveRecipe(newRecipe);

    }

    createRow(meal) {
        const rows = [];

        // Title row
        const firstRow = document.createElement('tr');
        firstRow.className = 'meal-row';
        const titleCell = document.createElement('td');
        titleCell.textContent = meal.mealTitle;
        titleCell.className = 'meal-title';
        firstRow.appendChild(titleCell);

        // Ingredients row
        const ingredientsCell = document.createElement('td');
        const ingredientsList = document.createElement('ul');
        meal.ingredients.forEach((ingredient) => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientsList.appendChild(li);
        });
        ingredientsCell.appendChild(ingredientsList);
        firstRow.appendChild(ingredientsCell);

        // Per Serving row
        const perServingCell = document.createElement('td');
        const perServingList = document.createElement('ul');
        Object.entries(meal.perServing).forEach(([key, value]) => {
            const li = document.createElement('li');
            li.textContent = `${key}: ${value}`;
            perServingList.appendChild(li);
        });
        perServingCell.appendChild(perServingList);
        firstRow.appendChild(perServingCell);
        rows.push(firstRow);

        // Instructions row
        const secondRow = document.createElement('tr');
        secondRow.className = 'link-row';
        const instructionsCell = document.createElement('td');
        const instructionsLink = document.createElement('a');
        instructionsLink.href = '#';
        instructionsLink.textContent = 'Instructions';
        instructionsLink.addEventListener('click', () => this.showInstructionsModal(meal.instructions));
        instructionsCell.appendChild(instructionsLink);
        secondRow.appendChild(instructionsCell);

        // Reviews row
        const reviewsCell = document.createElement('td');
        const reviewsLink = document.createElement('a');
        reviewsLink.href = meal.reviewsLink;
        reviewsLink.textContent = 'Reviews';
        reviewsLink.addEventListener('click', () => {
            localStorage.setItem('reviewList', JSON.stringify(meal.reviews))
            console.log(`reviewList: ${meal.reviews}`)});
        reviewsCell.appendChild(reviewsLink);
        secondRow.appendChild(reviewsCell);

        // Votes row
        const votesCell = document.createElement('td');
        votesCell.setAttribute('id',`${meal.mealTitle}-votes`)
        votesCell.textContent = `Votes: ${meal.votes}`; // Fix: Use template literals to interpolate meal.votes
        const upvoteButton = document.createElement('button');
        upvoteButton.className = 'btn btn-primary';
        upvoteButton.textContent = 'UpVote';
        upvoteButton.addEventListener('click', () => upVote(meal));
        votesCell.appendChild(upvoteButton);
        secondRow.appendChild(votesCell);
        rows.push(secondRow);

        return rows;
    }

    generateTable(mealData, id) {
        const tableContainer = document.getElementById(id);
        const table = document.createElement('table');
        table.className = 'table';
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headerRow = document.createElement('tr');
        ['Meal Title', 'Ingredients', 'Nutrition Info'].forEach((header) => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);

        mealData.forEach((meal) => {
        const mealRows = this.createRow(meal);
        mealRows.forEach((row) => tbody.appendChild(row));
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        tableContainer.appendChild(table);
    }

    async saveRecipe(recipeToSave) {
        try {
            const response = await fetch('/api/recipe', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(recipeToSave),
            });
            this.recipes = await response.json();
        } catch (error) {
            console.error(`Error saving recipes: ${error.message}`);
        }
    }

    // Functionality for peer communication using WebSocket
    configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        this.socket.onmessage = async (event) => {
            console.log("OnMessage entered")
            const msg = JSON.parse(await event.data.text());
            this.displayMsg(msg.value)

            // if(msg.type === UpVote) {
            //     this.displayMsg(msg)
            // }
        };
    }

    displayMsg(msg) {
        const voteCountElementId = `${msg.mealTitle}-votes`;
        const voteCountElement = document.getElementById(voteCountElementId);
        voteCountElement.innerHTML = `
            Votes: ${msg.votes} 
            <button class="btn btn-primary">UpVote</button>`;
        voteCountElement.addEventListener('click', () => upVote(msg));
        }

    broadcastEvent(from, type, value) {
        const event = {
        from: from,
        type: type,
        value: value,
        };

        this.socket.send(JSON.stringify(event));
    }
}

async function upVote(meal) {
    meal.votes += 1;
    try {
        const response = await fetch('/api/recipe', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(meal),
        });        
        // apiRecipes = await response.json();

    } catch (error) {
        console.error(`Error loading recipes: ${error.message}`);
        const storedRecipes = localStorage.getItem('apiRecipes');
        if (storedRecipes) {
            apiRecipes = JSON.parse(storedRecipes);
        }
    }    
    
    recipesClass.broadcastEvent('user', UpVote, meal);
}

function parseRecipes(apiRecipes) {
    let breakfastData = [];
    let lunchData = [];
    let dinnerData = [];

    for (const apiRecipe of apiRecipes) {
        console.log(apiRecipe);
        apiRecipe.ingredients = typeof apiRecipe.ingredients == 'string' ? apiRecipe.ingredients.split('\n') : []
        apiRecipe.instructions = typeof apiRecipe.instructions === 'string' ? apiRecipe.instructions.split('\n') : []

        // Assign the new recipe to the appropriate category
        if (apiRecipe.mealType === 'breakfast') {
            breakfastData.push(apiRecipe);
        } else if (apiRecipe.mealType === 'lunch') {
            lunchData.push(apiRecipe);
        } else if (apiRecipe.mealType === 'dinner') {
            dinnerData.push(apiRecipe);
        }
    }

    recipesClass.init(breakfastData, lunchData, dinnerData);
}

async function loadRecipes() {
    let apiRecipes = [];
    try {
        const response = await fetch('/api/recipes');
        apiRecipes = await response.json();

        // Save recipes in local storage as backup
        localStorage.setItem('apiRecipes', JSON.stringify(apiRecipes));
    } catch (error) {
        console.error(`Error loading recipes: ${error.message}`);
        const storedRecipes = localStorage.getItem('apiRecipes');
        if (storedRecipes) {
            apiRecipes = JSON.parse(storedRecipes);
        }
    }

    parseRecipes(apiRecipes);
}

function displayPicture(mealType) {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then((response) => response.json())
        .then((data) => {            
            // Check if data.meals is not empty
            console.log("TEST@")
            const meal = data.meals[0];
            console.log(meal)
            const imgUrl = meal.strMealThumb; // Use the correct property for the image URL
            const tdEl = document.getElementById(`${mealType}-image`);
            const imgEl = document.createElement("img")
            tdEl.appendChild(imgEl)
            console.log("IMGEL"+imgEl)
            imgEl.style.maxWidth = '300px';
            imgEl.style.maxHeight = '200px';
            imgEl.setAttribute('src', imgUrl);
            console.log("TEST" + imgUrl)
        })
        .catch((error) => {
            console.error('Error fetching meal data:', error);
        });
}

// recipesClass = new Recipes();
loadRecipes();
['breakfast', 'lunch', 'dinner'].forEach((mealType) => {
    displayPicture(mealType);
});
