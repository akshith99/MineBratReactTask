import React, { useEffect, useState } from "react";


const CitiesList = (props) => {

    const [cities, setCities] = useState([]);

    const [city, setCity] = useState("");

    console.log(city);

    useEffect(() => {
        fetch(`https://api.minebrat.com/api/v1/states/cities/${props.stateId}`)
            .then(response => response.json())
            .then(cities => { setCities(cities) });
    }, [props.stateId]);

    return (
        <>
            <select onChange={(event) => {
                console.log(event.target.value);
                setCity(event.target.value);
                props.onChange(event.target.value);
            }}
            >
                {cities.map((city) => {
                    return (
                        <option key={city.cityId} value={city.cityName}>{city.cityName}</option>
                    );
                })}
            </select>
        </>
    );

};

export default CitiesList;