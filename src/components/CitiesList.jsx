import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";


const CitiesList = forwardRef((props, ref) => {

    const [cities, setCities] = useState([]);

    const [cityId, setCityId] = useState(1);

    const [city, setCity] = useState("");

    useImperativeHandle(ref, () => ({
        handleSubmit: (cityId) => {
            const filteredCity = cities.filter((city) => city.cityId === cityId);
            var selectedCity = filteredCity.map((item) => item.cityName);
            selectedCity = selectedCity[0];
            setCity(selectedCity);
        }
    }))


    useEffect(() => {
        fetch(`https://api.minebrat.com/api/v1/states/cities/${props.stateId}`)
            .then(response => response.json())
            .then(cities => { setCities(cities) });
        console.log(cities);
    }, [props.stateId]);

    return (
        <>
            <select onChange={(event) => {
                console.log(event.target.value);
                setCityId(event.target.value);
            }}>
                {cities.map((city) => {
                    return (
                        <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
                    );
                })}
            </select>
        </>
    );

});

export default CitiesList;