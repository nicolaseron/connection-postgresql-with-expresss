const btn = document.querySelector('.btn');
btn.addEventListener('click', displayUsers);

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
