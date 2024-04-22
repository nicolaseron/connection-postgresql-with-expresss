function checkUserLogin() {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim().split('='));
    const tokenCookie = cookies.find(cookie => cookie[0] === 'authToken');

    if (!tokenCookie || !tokenCookie[1]) {
        window.location.href = './index.html';
    }
}
checkUserLogin()