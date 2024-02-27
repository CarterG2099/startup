class Recipes {
    constructor() {
        const userNameEl = document.querySelector('.user-name');
        userNameEl.textContent = this.getUserName() + ' ' + userNameEl.textContent;
    }

    getUserName() {
        return localStorage.getItem('userName') ?? 'UserName';
    }
}

const recipes = new Recipes();