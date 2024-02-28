class Recipes {
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

    // increaseVoteCount() {
    //     const countEl = document.querySelector('.count');
    //     countEl.textContent = parseInt(countEl.textContent) + 1;
    // }

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
        instructionsLink.href = meal.instructionsLink;
        instructionsLink.textContent = 'Instructions';
        instructionsCell.appendChild(instructionsLink);
        secondRow.appendChild(instructionsCell);

        // Reviews row
        const reviewsCell = document.createElement('td');
        const reviewsLink = document.createElement('a');
        reviewsLink.href = meal.reviewsLink;
        reviewsLink.textContent = 'Reviews';
        reviewsCell.appendChild(reviewsLink);
        secondRow.appendChild(reviewsCell);

        // Votes row
        const votesCell = document.createElement('td');
        votesCell.textContent = 'Votes: ';
        const upvoteButton = document.createElement('button');
        upvoteButton.className = 'btn btn-primary';
        upvoteButton.textContent = 'UpVote';
        upvoteButton.addEventListener('click', () => this.upVoteCounts());
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
        },
        // Add more data as needed
    ];
}

const recipes = new Recipes();