import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {NavLink} from 'react-router-dom';
import { getCountriesDB } from '../store/actions/countriesActions';

export const Landing = () => {

    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getCountriesDB());
    }, [dispatch]);

    const handlerClick = (e) => {
        e.preventDefault();
        dispatch(getCountriesDB());
    }
    

    return (
        <div className="landing__main">
            <div className="landing__login">
                <h1 className="landing__title">Activities for every countries</h1>
                <div className="landing__btn">
                    <button
                        className="btn btn-blue"
                        onClick={(e) => {
                            handlerClick(e);
                        }} >
                            Load Countries
                    </button>
                    <NavLink to='/countries'>
                        <button className="btn btn-blue">
                            Login
                        </button>
                    </NavLink> 
                </div>
                <div className="landing__author">
                    <h5>Proyecto Individual de Rocio Juarez</h5>
                </div>
            </div>
        </div>
    )
}
