import React, { useState  } from 'react';
import { useDispatch } from 'react-redux';
import { getNameCountries } from '../store/actions/countriesActions';

export const SearchBar = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");

    const handlerInputSearchChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const handlerClick = (e) => {
        e.preventDefault();
        dispatch(getNameCountries(name));
    }

    return (
        <div className="searchBar__main">
            <h4>Look for a country!</h4>
            <input
                className="searchBar__input"
                type="text"
                placeholder="Country Name"
                value={name}
                onChange={handlerInputSearchChange}
            />
            <button className="btn btn-home" onClick={(e) => handlerClick(e)}>
                Search
            </button>
        </div>
    )
}
