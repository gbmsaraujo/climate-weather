const inputEl = document.getElementById('input-city');
const btnSearch = document.getElementById('btn-search');
const cityValue = document.getElementById('city-value');
const tempValue = document.getElementById('temp-value');
const imgEl = document.getElementById('img-value');
const weatherValue = document.getElementById('weather-value');

const API_KEY = 'dbcec9424acb0c9aa91f38158ae5b786';

function getData() {
	let cityName = 'Rio de Janeiro';

	inputEl.addEventListener('input', (e) => {
		cityName = e.target.value;
	});

	btnSearch.addEventListener('click', () => {
		fetchData(cityName).then((res) => renderApp(res));
	});
}

function convertKelvinToCelsius(temperature) {
	const conversion = (temperature - 273).toFixed(0);
	return conversion;
}

getData();

async function fetchData(city='Rio de Janeiro') {
	const data = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
	)
		.then((res) => res.json())
		.then((data) => data);

	return {
		cidade: data.name,
		clima: data.weather[0].main,
		icone: data.weather[0].icon,
		temperatura: convertKelvinToCelsius(data.main.temp)
	};
}

function renderApp(data) {
	cityValue.innerText = data.cidade;
	tempValue.innerText = data.temperatura;
	weatherValue.innerText = data.clima;
	imgEl.src = `http://openweathermap.org/img/wn/${data.icone}@2x.png`;
}
