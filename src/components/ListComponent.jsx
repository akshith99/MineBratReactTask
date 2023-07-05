import React, { useEffect, useState } from "react";
import ResultComponent from "./ResultComponent";



const ListComponent = () => {

    const [states, setStates] = useState([]);

    const [stateId, setStateId] = useState(1);

    const [cityId, setCityId] = useState(1);

    const [state, setState] = useState("");

    const [cities, setCities] = useState([]);

    const [city, setCity] = useState("");

    const [resultVisible, setResultVisible] = useState(false);


    useEffect(() => {
        fetch('http://api.minebrat.com/api/v1/states')
            .then(response => response.json())
            .then(states => { setStates(states) });
        console.log(states);
    }, []);

    useEffect(() => {
        fetch(`https://api.minebrat.com/api/v1/states/cities/${stateId}`)
            .then(response => response.json())
            .then(cities => { setCities(cities) });
        console.log(cities);
    }, [stateId]);

    const handleSubmit = (stateId, cityId) => {

        const filteredState = states.filter((state) => state.stateId === stateId);
        var selectedState = filteredState.map((item) => item.stateName);
        selectedState = selectedState[0];
        console.log(selectedState);
        setState(selectedState);

        const filteredCity = cities.filter((city) => city.cityId === cityId);
        var selectedCity = filteredCity.map((item) => item.cityName);
        selectedCity = selectedCity[0];
        setCity(selectedCity);

        setResultVisible(true);
    }

    return (
        <>
            <select
                onChange={(event) => {
                    console.log(event.target.value);
                    setStateId(event.target.value);
                }}
            >
                {states.map((state) => {
                    return (
                        <option
                            key={state.stateId}
                            value={state.stateId}
                        >
                            {state.stateName}
                        </option>
                    );
                })}
            </select>

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

            <button
                type="submit"
                onClick={() => { handleSubmit(stateId, cityId) }}
            >Submit</button>

            {resultVisible && <ResultComponent state={state} city={city} />}
        </>
    );
}

export default ListComponent;