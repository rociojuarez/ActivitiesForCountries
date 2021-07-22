import React from 'react'
import {NavLink} from 'react-router-dom';
import { GiEarthAmerica } from "react-icons/gi";

export const NavBar = () => {
    return (
        <div className="navbar">
            <h1><GiEarthAmerica/> Activities for every countries </h1>
            <NavLink to="/activity" className="navbar_text">Create Activity</NavLink>
            <NavLink to="/countries" className="navbar_text">Countries</NavLink>
        </div>
    )
}
