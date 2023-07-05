import React from "react";

const ResultComponent = (props) => {

    return(
        <>
            <h1>You Have selected {props.state}, {props.city}</h1>
        </>
    );

}

export default ResultComponent;