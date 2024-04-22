const btn = document.querySelector('.btn');
const userId = document.querySelector('#userId');
const btnUser = document.querySelector('.userIdBtn');
const registerForm = document.querySelector('#registerForm');
const loginForm = document.querySelector('#loginForm');
const registerEmail = document.querySelector('#registerEmail');
const registerPassword = document.querySelector('#registerPassword');
const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
const btnLogout = document.querySelector('#logout');
const infoStatus = document.querySelector('.infoStatus');
btn.addEventListener('click', displayUsers);
btnUser.addEventListener('click', displayUser);
btnLogout.addEventListener('click', logout)
registerForm.addEventListener('submit', register)
loginForm.addEventListener('submit', login)

checkUserLogin()

async function displayUsers() {
    try {
        const response = await fetch('http://localhost:3000/api/users');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des utilisateurs');
        }
        const users = await response.json();
        const preElement = document.querySelector('.elem');
        preElement.innerHTML = '';

        users.forEach((user) => {
            console.log(user)
            const userData = `Nom: ${user.nom}, Prénom: ${user.prenom}, Id: ${user.id}`;
            const paragraph = document.createElement('p');
            paragraph.textContent = userData;
            preElement.appendChild(paragraph);
        });
    } catch (err) {
        console.error(err);
    }
}

async function displayUser() {
    try {
        const id = userId.value
        const response = await fetch(`http://localhost:3000/api/user/${id}`)
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération de l'utilisateurs");
        }
        const preElement = document.querySelector('.elem');
        preElement.innerHTML = '';
        const paragraph = document.createElement('p');
        const userResponse = await response.json();
        preElement.appendChild(paragraph);
        const user = userResponse[0];
        if (!user) {
            paragraph.textContent = `Désolé il n'y aucun user avec l'id ${id}`
        } else {
            paragraph.textContent = `Nom: ${user.nom}, Prénom: ${user.prenom}, Id: ${user.id}`;
        }
    } catch (error) {
        console.error(error);
    }
}

async function register(e) {
    e.preventDefault();
    const dataForm = {
        email: registerEmail.value,
        password: registerPassword.value,
    };

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataForm)
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'inscription');
        }
    } catch (error) {
        console.error(error);
    }
}

async function login(e) {
    e.preventDefault();
    const dataForm = {
        email: loginEmail.value,
        password: loginPassword.value,
    };

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataForm)
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la connexion ');
        }
        const token = await response.json()
        setCookie("authToken", token, 7);
        checkUserLogin()
    } catch (error) {
        console.error(error);
    }
}

function logout() {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    checkUserLogin();
}

function checkUserLogin() {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim().split('='));
    const tokenCookie = cookies.find(cookie => cookie[0] === 'authToken');

    if (!tokenCookie || !tokenCookie[1]) {
        infoStatus.textContent = 'Disconnected !';
    } else {
        infoStatus.textContent = 'Connected !';
    }
}


function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; secure";
}
