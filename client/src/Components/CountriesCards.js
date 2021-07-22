import React from 'react';

export const CountriesCards = ({name, flag, region}) => {
    return (
        <div className="countries__Card">
            <div className="card_text">
            <h4 className="card_text">{name}</h4>
            <h5 className="card_region">{region}</h5>
            </div>
            <img className="card_img" src={flag} alt="" width="170px" height="170px"/>
        </div>
    )
}