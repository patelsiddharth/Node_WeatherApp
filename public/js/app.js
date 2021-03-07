mapboxgl.accessToken = 'pk.eyJ1Ijoic2lkZGhhcnRoMTc3IiwiYSI6ImNra29lMmt0ODAxeGkydnA2ZHlyMnM3MXIifQ.9iM6rVBknl7eod-lRvCdnQ';

const weatherForm = document.querySelector('#weather-form');
const searchbar = document.querySelector('.search-bar');
const search = document.querySelector('#location');
const searchbtn = document.querySelector('#submit');
const back = document.querySelector('.back-btn');
const card = document.querySelector('.location-card');
const cardreveal = document.querySelector('.card-reveal');
const footer = document.querySelector('.web-footer');

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
const days = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February', 'March', 'April','May', 'June','July', 'August', 'September', 'October', 'November','December'];

document.addEventListener('DOMContentLoaded', function() 
{
    var sidenav = document.querySelectorAll('.sidenav');
    var instancesSideNav = M.Sidenav.init(sidenav);
});

$(document).ready(function()
{
    $('.tooltipped').tooltip();
});

const foot = document.querySelector('.madeWith')
const foottext = document.querySelector('.footer-text')
let tech = ['HTML','CSS','JavaScript','Node.JS']
let i = 1;
foot.innerHTML = 'HTML'
setInterval(() => 
{
    foot.innerHTML = tech[i++];
    if(i > tech.length)
    {
        foottext.innerHTML = 'Created by '
        foot.innerHTML = 'Siddharth Patel'
    }
}, 1000);

searchbtn.addEventListener('click', e => 
{
    preloader.style.display = 'block';
    cardLocation.style.display = 'none';
    searchbar.style.display = "none";
    // footer.style.position = "relative";
    // footer.style.marginTop = "60px";
})

back.addEventListener('click', e => 
{
    preloader.style.display = 'none';
    cardLocation.style.display = 'none';
    back.style.display = 'none';
    searchbar.style.display = "block";
    cardreveal.style.display = 'none';
    search.value = '';
    cardreveal.style.transform = 'translateY(0%)';
    // footer.style.position = "fixed";
    // footer.style.marginTop = "0px";
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
                preloader.style.display = 'none';
                cardLocation.style.display = 'none';
                searchbar.style.display = "block";
            }
            else
            {
                if(data.error)
                {
                    M.toast({html: data.error})
                    preloader.style.display = 'none';
                    cardLocation.style.display = 'none';
                    searchbar.style.display = "block";
                    search.value = '';
                    return;
                }
                preloader.style.display = 'none';
                back.style.display = 'block';
                cardLocation.style.display = 'block';
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

                humidity.textContent = `${data.weather.humidity}%`;
                precipitation.textContent = `${data.weather.precip_mm}mm`;
                wind.textContent = `${data.weather.wind_dir} ${data.weather.wind_kph} Km/h`;
                uvIndex.textContent = `${data.weather.uv} of 10`;
                sunrise.textContent = data.locationInfo.astronomy.astro.sunrise;
                sunset.textContent = data.locationInfo.astronomy.astro.sunset;
                moonrise.textContent = data.locationInfo.astronomy.astro.moonrise;
                moonset.textContent = data.locationInfo.astronomy.astro.moonset;

                const time = new Date(data.weather.last_updated);
                const day = days[time.getDay()];
                const dateTime = time.toLocaleString();
                document.querySelector('#time').textContent = `${day}, ${dateTime}`;
                document.querySelector('#realfeel').textContent = data.weather.feelslike_c;
                document.querySelector('#temperature').textContent = data.weather.temp_c;
                document.querySelector('.desc').textContent = data.weather.condition.text;

                const dayDesc = document.querySelector('#day');
                dayDesc.textContent = data.weather.is_day === 1 ? "Day" : "Night";
            }
        })
        .catch(err => 
        {
            M.toast({html: err})
            preloader.style.display = 'none';
            cardLocation.style.display = 'none';
            searchbar.style.display = "block";
            search.value = '';
        })
    })
    .catch(error => 
    {
        M.toast({html: error})
        preloader.style.display = 'none';
        cardLocation.style.display = 'none';
        searchbar.style.display = "block";
        search.value = '';
    })
})
        