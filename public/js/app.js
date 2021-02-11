const weatherForm = document.querySelector('#weather-form');
const search = document.querySelector('#location');
const weather = document.querySelector('#weather');
const errorInfo = document.querySelector('#errorinfo');

weatherForm.addEventListener('submit', (e) => 
{
    e.preventDefault();
    weather.textContent = 'Loading...'
    fetch(`http://localhost:3000/weather?address=${search.value}`)
    .then(response => 
    {
        response.json()
        .then(data => 
        {
            if(data.Error)
            {
                errorInfo.textContent = data.Error;
            }
            else
            {
                console.log(data)
                weather.innerHTML = 
                `
                    Forecast : ${data.Forecast}
                    <br>
                    Location : ${data.location}
                    <br>
                    Place : ${data.place}
                `;
            }
        })
        .catch(err => 
        {
            console.log(err);
        })
    })
    .catch(error => 
    {
        console.log(error);
    })
})