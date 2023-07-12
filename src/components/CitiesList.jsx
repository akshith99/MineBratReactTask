import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";


const CitiesList = forwardRef((props, ref) => {

    const [cities, setCities] = useState([]);

    const [city, setCity] = useState("");

    console.log(city);

    useEffect(() => {
        fetch(`https://api.minebrat.com/api/v1/states/cities/${props.stateId}`)
            .then(response => response.json())
            .then(cities => { setCities(cities) });
    }, [props.stateId]);

    useImperativeHandle(ref, () => ({
        selectedCity: () => {
            props.onChange(city);
        },
    }));

    return (
        <>
            <select
                defaultValue={'DEFAULT'}
                onClick={(event) => {
                    console.log(event.target.value);
                    setCity(event.target.value);
                }}
            >
                <option value="DEFAULT" disabled>Select a city</option>
                {cities.map((city) => {
                    return (
                        <option key={city.cityId} value={city.cityName}>{city.cityName}</option>
                    );
                })}
            </select>
        </>
    );

});

export default CitiesList;