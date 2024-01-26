const resultado = document.querySelector('.result');
const form = document.querySelector('.clima');
const nombreCiudad  = document.querySelector('#ciudad');
const nombrePais = document.querySelector('#pais');

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    if (nombreCiudad.value === "" || nombrePais.value === ""){
        validar('Ambos campos son obligatorios');
        return;
    }
    callAPI(nombreCiudad.value, nombrePais.value);
    //console.log(nombreCiudad.value);
    //console.log(nombrePais.value);
})

function callAPI (ciudad, pais){
    const apiId = "c05e45dfafb6b6491386473314873d25";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiId}`;
    

    fetch(url)
       .then(data =>{
        return data.json();
       })

       .then(dataJSON =>{
        if (dataJSON.cod === "404"){
            validar("ciudad no encontrada");
        } else{
            clearHTML();
            showWeather(dataJSON);
        }
        console.log(dataJSON);
       })

       .catch(error => { 
        console.log(error);
       })

}
function showWeather(data){
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;

    const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degrees}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
    `;

    resultado.appendChild(content);


//console.log(name);
//console.log(temp); 
//console.log(temp_min);
//console.log(temp_max);
//console.log(arr.icon);

}


function validar(message){
    //console.log(message);

    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
       alert.remove();
    }, 3000);
}

function kelvinToCentigrade(temp){
    return parseInt (temp -273.15);

}

function clearHTML(){
    resultado.innerHTML = "";
}