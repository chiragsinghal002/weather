import React, { useEffect, useState } from "react"

function Weather() {
    const [state, setstate] = useState("delhi");
    const [getinfo, setgetInfo] = useState({});
    let date = new Date();
    date = date.toLocaleString('en-US', {
        weekday: 'short', // long, short, narrow
        day: 'numeric', // numeric, 2-digit
        year: 'numeric', // numeric, 2-digit
        month: 'long', // numeric, 2-digit, long, short, narrow
        hour: 'numeric', // numeric, 2-digit
        minute: 'numeric', // numeric, 2-digit
        second: 'numeric', // numeric, 2-digit
    });

    useEffect(async () => {

        getCurrLocation();
    }, [])

    function getlocation() {
        getCurrLocation();
    }

    async function getCurrLocation() {
        let url = "https://api.openweathermap.org/data/2.5/weather?q=" + state + "&units=metric&appid=fbe9e2c58aafed4b19936c8e90659c3e";
        let result = await fetch(url);
        result = await result.json();
        console.log(result);
        if (result.cod !== '404') {
            const { feels_like: feels, humidity, pressure, temp, temp_max: max, temp_min: min } = result.main;
            const { main, description } = result.weather[0];

            const { speed: wind } = result.wind;
            const { name: city } = result;
            const info = {
                feels, humidity, pressure, temp, max, min, main, description, wind, city
            }
            //console.log(city);
            setgetInfo(info);
        }


    }

    // setInterval((e)=>{
    //     getCurrLocation()
    // },2000);


    return (
        <div>
            <div className="container-fluid px-1 px-sm-3 py-5 mx-auto">
                <div className="row d-flex justify-content-center">
                    <div className="row card0">


                        <div className="card1 col-lg-8 col-md-7"> <h1>{getinfo.description}</h1>
                            <div className="text-center"> <img className="image mt-5" src="https://i.imgur.com/M8VyA2h.png" /> </div>
                            <div className="row px-3 mt-3 mb-3">
                                <h1 className="large-font mr-3">{getinfo.temp}&#176;c</h1>
                                <div className="d-flex flex-column mr-3">
                                    <h2 className="mt-3 mb-0">{getinfo.city}</h2> <small>{date}</small>
                                </div>
                                <div className="d-flex flex-column text-center">
                                    <h3 className="fa fa-sun-o mt-4"></h3> <small>{getinfo.main}</small>
                                </div>
                            </div>
                        </div>
                        <div className="card2 col-lg-4 col-md-5">
                            <div className="row px-3"> <input type="text" name="location" placeholder="Another location" className="mb-5" onChange={(e) => setstate(e.target.value)} />
                                <div className="fa fa-search mb-5 mr-0 text-center" onClick={(e) => getlocation()}></div>
                            </div>
                            <div className="mr-5">

                                <div className="line my-5"></div>
                                <p>Weather Details</p>
                                <div className="row px-3">
                                    <p className="light-text">Cloudy</p>
                                    <p className="ml-auto">12%</p>
                                </div>
                                <div className="row px-3">
                                    <p className="light-text">Humidity</p>
                                    <p className="ml-auto">{getinfo.humidity}%</p>
                                </div>
                                <div className="row px-3">
                                    <p className="light-text">Wind</p>
                                    <p className="ml-auto">{getinfo.wind}km/h</p>
                                </div>
                                <div className="row px-3">
                                    <p className="light-text">Feels Like</p>
                                    <p className="ml-auto">{getinfo.feels}&#176;c</p>
                                </div>
                                <div className="row px-3">
                                    <p className="light-text">Min</p>
                                    <p className="ml-auto">{getinfo.min}&#176;c</p>
                                </div>
                                <div className="row px-3">
                                    <p className="light-text">Max</p>
                                    <p className="ml-auto">{getinfo.max}&#176;c</p>
                                </div>
                                <div className="line mt-3"></div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather;