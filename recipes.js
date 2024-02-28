class Recipes {
    tempReviewList1 = [
        {
          mealTitle: 'Test1',
          userName: 'John',
          review: 'This is a great recipe',
          rating: 4,
          votes: 6,
          url: 'reviews.html',
        },
        {
          mealTitle: 'Test1',
          userName: 'Jane',
          review: 'This is a great recipe',
          rating: 5,
          votes: 10,
          url: 'reviews.html',
        },
        {
          mealTitle: 'Test1',
          userName: 'Jill',
          review: 'This is a great recipe',
          rating: 5,
          votes: 10,
          url: 'reviews.html',
        },
        {
          mealTitle: 'Test1',
          userName: 'Jack',
          review: 'This is a great recipe',
          rating: 5,
          votes: 10,
          url: 'reviews.html',
        },
      ];
      
       tempReviewList2 = [
        {
          mealTitle: 'Test2',
          userName: 'Sam',
          review: 'This is a great recipe',
          rating: 5,
          votes: 10,
          url: 'reviews.html',
        },
        {
          mealTitle: 'Test2',
          userName: 'Tony',
          review: 'This is a great recipe',
          rating: 5,
          votes: 10,
          url: 'reviews.html',
        },
        {
          mealTitle: 'Test2',
          userName: 'Abby',
          review: 'This is a great recipe',
          rating: 5,
          votes: 10,
          url: 'reviews.html',
        },
        {
          mealTitle: 'Test2',
          userName: 'Tina',
          review: 'This is a great recipe',
          rating: 5,
          votes: 10,
          url: 'reviews.html',
        },
      ];
    constructor() {
        const userNameEl = document.querySelector('.user-name');
        userNameEl.textContent = this.getUserName() + ' ' + userNameEl.textContent;
        this.generateTable(this.breakfastData, 'breakfast-table');
        this.generateTable(this.lunchData, 'lunch-table');
        this.generateTable(this.dinnerData, 'dinner-table');
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
        console.log(mealType);
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
            mealTitle,
            ingredients: ingredients.split(','),
            perServing,
            instructions,
            reviewsLink,
            votes
        };
        if(mealType === 'breakfast') {
            this.breakfastData.push(newRecipe);
        }
        if(mealType === 'lunch') {
            this.lunchData.push(newRecipe);
        }
        if(mealType === 'dinner') {
            this.dinnerData.push(newRecipe);
        }
    }

    upVote(meal) {
        meal.votes += 1;
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
        votesCell.textContent = `Votes: ${meal.votes}`; // Fix: Use template literals to interpolate meal.votes
        const upvoteButton = document.createElement('button');
        upvoteButton.className = 'btn btn-primary';
        upvoteButton.textContent = 'UpVote';
        upvoteButton.addEventListener('click', () => this.upVote(meal));
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

    breakfastData = [
        {
            mealTitle: 'Waffles',
            ingredients: ['ingredient1', 'ingredient2', 'ingredient3'],
            perServing: {
                calories: '300',
                protein: '20g',
                fat: '10g',
                carbs: '40g',
            },
            instructions: 'Sample instructions',
            reviewsLink: 'reviews.html',
            votes: 7,
            reviews: this.tempReviewList2
        },
        {
            mealTitle: 'Eggs',
            ingredients: ['ingredient1', 'ingredient2', 'ingredient3'],
            perServing: {
                calories: '300',
                protein: '20g',
                fat: '10g',
                carbs: '40g',
            },
            instructions: 'Sample instructions',
            reviewsLink: 'reviews.html',
            votes: 3,
            reviews: this.tempReviewList1
        },
        // Add more data as needed
    ];
    lunchData = [
        {
            mealTitle: 'Pasta',
            ingredients: ['ingredient1', 'ingredient2', 'ingredient3'],
            perServing: {
                calories: '300',
                protein: '20g',
                fat: '10g',
                carbs: '40g',
            },
            instructions: 'Sample instructions',
            reviewsLink: 'reviews.html',
            votes: 2,
            reviews: this.tempReviewList1
        },
        // Add more data as needed
    ];


    dinnerData = [
        {
            mealTitle: 'Fajitas',
            ingredients: ['ingredient1', 'ingredient2', 'ingredient3'],
            perServing: {
                calories: '300',
                protein: '20g',
                fat: '10g',
                carbs: '40g',
            },
            instructions: 'Sample instructions',
            reviewsLink: 'reviews.html',
            votes: 0,
            reviews: this.tempReviewList2
        },
        // Add more data as needed
    ];


      
}


const recipes = new Recipes();
