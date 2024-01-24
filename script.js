fetch("https://api.weatherapi.com/v1/current.json?key=fcc0d01cc9344f61b82161356242401&q=tilburg")
.then(function(response) {
    return response.json();
})
.then(function(response) {
    setWheather(response);
})
.catch(function(err) {
    console.log(err);
});

function setWheather(response) {
    console.log(response);
}
