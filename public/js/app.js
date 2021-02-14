mapboxgl.accessToken = 'pk.eyJ1Ijoic2lkZGhhcnRoMTc3IiwiYSI6ImNra29lMmt0ODAxeGkydnA2ZHlyMnM3MXIifQ.9iM6rVBknl7eod-lRvCdnQ';

const weatherForm = document.querySelector('#weather-form');
const search = document.querySelector('#location');
const searchbtn = document.querySelector('#submit');
const weather = document.querySelector('#weather');
const errorInfo = document.querySelector('#errorinfo');
const card = document.querySelector('.location-card');

const humidity = document.querySelector('.humidity');
const precipitation = document.querySelector('.precipitation');
const wind = document.querySelector('.wind');
const uvIndex = document.querySelector('.uvIndex');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const moonrise = document.querySelector('.moonrise');
const moonset = document.querySelector('.moonset');

const preloader = document.querySelector('.preloader');
const cardLocation = document.querySelector('.location-card');

searchbtn.addEventListener('click', e => {
    preloader.style.display = 'block';
    cardLocation.style.display = 'none';
})

weatherForm.addEventListener('submit', (e) => 
{
    e.preventDefault();
    preloader.style.display = 'block';
    fetch(`/weather?address=${search.value}`)
    .then(response => 
    {
        response.json()
        .then(data => 
        {
            if(data.Error)
            {
                M.toast({html: data.Error})
                //errorInfo.textContent = data.Error;
                preloader.style.display = 'none';
                cardLocation.style.display = 'none';
            }
            else
            {
                preloader.style.display = 'none';
                cardLocation.style.display = 'block';
                console.log(data);
                var map = new mapboxgl.Map(
                {
                    container: 'map',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [data.longitude, data.latitude],
                    zoom: 10
                });
                var marker = new mapboxgl.Marker()
                            .setLngLat([data.longitude, data.latitude])
                            .addTo(map);
                
                card.style.display = "block";
                document.querySelector('#title').textContent = data.place;
                document.querySelector('#title-card').textContent = data.place;
                document.querySelector('#forecast').textContent = data.Forecast;
                document.querySelector('#forecast-img').setAttribute('src', data.weather.condition.icon);
                document.querySelector('#weather-icon').setAttribute('src', data.weather.condition.icon);

                humidity.textContent = data.weather.humidity;
                precipitation.textContent = data.weather.precip_mm;
                wind.textContent = data.weather.wind_kph + data.weather.wind_degree + ' ' + data.weather.wind_dir;
                uvIndex.textContent = data.weather.uv;
                sunrise.textContent = data.locationInfo.astronomy.astro.sunrise;
                sunset.textContent = data.locationInfo.astronomy.astro.sunset;
                moonrise.textContent = data.locationInfo.astronomy.astro.moonrise;
                moonset.textContent = data.locationInfo.astronomy.astro.moonset;

                document.querySelector('#realfeel').textContent = data.weather.feelslike_c;
                document.querySelector('#temperature').textContent = data.weather.temp_c;
                document.querySelector('.desc').textContent = data.weather.condition.text;

                const dayDesc = document.querySelector('#day');
                dayDesc.textContent = data.weather.is_day === 1 ? "Day" : "Night";
                console.log(data.locationInfo)
            }
        })
        .catch(err => 
        {
            console.log(err);
            preloader.style.display = 'none';
        })
    })
    .catch(error => 
    {
        console.log(error);
        preloader.style.display = 'none';
    })
})
        