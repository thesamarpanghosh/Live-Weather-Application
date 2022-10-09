import React, { useState, useEffect } from 'react';
import './css/styles.css';

const TempApp = () => {

    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Kolkata");
    const [weat, setWeat] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=73786756a9639954e0f70e349c5cf4aa`;
            const response = await fetch(url);
            const resJson = await response.json();
            setCity(resJson.main);
            setWeat(resJson.weather);
        }
        fetchApi();
    }, [search])

    return (
        <>
            <div className="box">
                <input className="inputField" type="search" value={search} onChange={(event) => { setSearch(event.target.value) }} />
                {!city ? (<p className='errorMsg'>No Data Found</p>) : (
                    <div>
                        <div className="info">
                            <h2 className="location">
                                <i className="fa-sharp fa-solid fa-map-pin"></i> {search.charAt(0).toUpperCase() + search.slice(1)}
                            </h2>
                            <h1 className="temp"> {city.temp}&deg; C</h1>
                            <img src={`http://openweathermap.org/img/w/${weat[0].icon}.png`} alt={weat[0].icon}></img>
                            <h3 className="weatArr">{weat[0].main}</h3>
                            <h3 className="humid">Humidity {city.humidity}%</h3>
                            <h3 className="tempmin_max"> Max {city.temp_max} &deg; C | Min {city.temp_min} &deg; C
                            </h3>
                        </div>
                    </div>
                )
                }
            </div>
        </>
    )
}

export default TempApp;