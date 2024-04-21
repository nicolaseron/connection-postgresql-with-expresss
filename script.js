const btn = document.querySelector('.btn');
const userId = document.querySelector('#userId');
const btnUser = document.querySelector('.userIdBtn');
btn.addEventListener('click', displayUsers);
btnUser.addEventListener('click', displayUser);

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