class Recipes {
    constructor() {
        const userNameEl = document.querySelector('.user-name');
        userNameEl.textContent = this.getUserName() + ' ' + userNameEl.textContent;
    }

    getUserName() {
        return localStorage.getItem('userName') ?? 'UserName';
    }

    showModal() {
        const modalEl = document.querySelector('#myModal');
        const modal = new bootstrap.Modal(modalEl);
        modalEl.show()
    }
}

const recipes = new Recipes();