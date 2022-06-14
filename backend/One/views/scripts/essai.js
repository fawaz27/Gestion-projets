function makeRequest(url, method) {
    var jwtToken = localStorage.getItem('token')
    var headers = {}

    if(jwtToken) {
        headers['Authorization'] = 'Bearer ' + jwtToken
    }

    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        headers: headers
    })
}
