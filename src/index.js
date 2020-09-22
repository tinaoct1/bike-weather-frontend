import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import './styles.css';
const API_HOST = "https://bike-weather.herokuapp.com/api/v1"
function App() {
	const [stations, setStations] = useState(null);
	const [at, setAt] = useState(null);
	const [kioskId, setKioskId] = useState(null);
	const fetchData = async () => {
		const url =`${API_HOST}/stations${kioskId ? "/"+kioskId + "?": "?"}at=${at}`
		const response = await axios.get(
			url,
			{
				headers: {
					"api-token": "prod1234",
					'Content-Type': 'application/json',
				}
			}
		);
		
		setStations(response.data);
	};
	
	const setTime = (a) => {
		setAt(a)
	}
	const setKiosk = (a) => {
		setKioskId(a)
	}
	
	
	
	return (
		<div className="App">
		<h1>Bikes Availability</h1>
	
	<div>
	
	<div >
	<label>
	Time:
<input className="text-input" onChange={event => setTime(event.target.value)} />
<br />
	<br />
	
	Kiosk:
<input className="text-input" onChange={event => setKiosk(event.target.value)} />

</label>
	</div>
	
	<br />
	
	<button className="fetch-button" onClick={fetchData}>
		Fetch Data
	</button>
	
	<br />
	</div>
	
	{/* Display data from API */}
	<div className="at"> {stations && moment(stations.at).format('LLL')}</div>
	<div className="weather"> {stations && stations.weather.weather[0].description}</div>
	<div className="stations">
		{stations &&
		stations.stations.map((station, index) => {
			return (
		<div className="station" key={index}>
		<h3>Station {index + 1}</h3>
	<h2>{station.properties.name}</h2>
	<div className="details">
		<p>Bikes Available: {station.properties.bikesAvailable}</p>
	<p>Address: {station.properties.addressStreet}</p>
	</div>
	</div>
);
})}
</div>
	
	</div>
);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
