import React, { useEffect, useRef, useState } from "react";
import ResultComponent from "./ResultComponent";
import CitiesList from "./CitiesList";



const ListComponent = () => {

    const [states, setStates] = useState([]);

    const [stateId, setStateId] = useState(1);

    const [state, setState] = useState("");

    const [city, setCity] = useState("");

    const [resultVisible, setResultVisible] = useState(false);

    const ref = useRef();


    useEffect(() => {
        fetch('http://api.minebrat.com/api/v1/states')
            .then(response => response.json())
            .then(states => { setStates(states) });
    }, []);

    const handleSubmit = (stateId) => {

        const filteredState = states.filter((state) => state.stateId === stateId);
        let selectedState = filteredState.map((item) => item.stateName);
        selectedState = selectedState[0];
        console.log(selectedState);
        setState(selectedState);

        ref.current.selectedCity();

        setResultVisible(true);

    }

    const handleCitySubmit = (city) => {
        setCity(city);
        console.log("city is", city);
    }

    return (
        <>
            <select
                defaultValue={'DEFAULT'}
                onClick={(event) => {
                    console.log(event.target.value);
                    setStateId(event.target.value);
                }}
            >
                <option value="DEFAULT" disabled>Select a state</option>
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

            <CitiesList ref={ref} stateId={stateId} onChange={handleCitySubmit} />

            <button
                type="submit"
                onClick={() => { handleSubmit(stateId) }}
            >Submit</button>

            {resultVisible && city.length > 0 && state.length > 0 &&
                <ResultComponent state={state} city={city} />}

            {!resultVisible && city.length <= 0 && state.length <= 0 &&
                <p>Oops..., It is lonely here.</p>}
        </>
    );
}

export default ListComponent;