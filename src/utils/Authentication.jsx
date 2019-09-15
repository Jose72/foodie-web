
export const Auth = {
    login,
    logout,
    loggedIn: false,
    isAuthenticated
};

function getToken() { return Auth.loggedIn ? (localStorage.getItem('token')) : (null)};

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                Auth.logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function login(username, password) {
    console.log("Login")
    if (username == 'admin' && password == 'admin') {
        localStorage.setItem('token', JSON.stringify('token'));
        Auth.loggedIn = true
        console.log("login admin")
    } else {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };
    
        return fetch('https://taller2-foodie.herokuapp.com/admin/authenticate', requestOptions)
            .then(handleResponse)
            .then(token => {
                localStorage.setItem('token', JSON.stringify(token));
                Auth.loggedIn = true
                console.log("login admin")
                return token;
            });
        }
};

function logout(){
        Auth.loggedIn = false
        localStorage.removeItem('token');
        console.log("Logout")
};

function isAuthenticated(){
        return this.loggedIn
};
