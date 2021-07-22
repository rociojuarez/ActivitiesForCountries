import {React, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDetail} from '../store/actions/countriesActions';
import {NavLink} from 'react-router-dom';
import { NavBar } from './NavBar';


export const Details = (props) => {
    //console.log("PROPS", props)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [ dispatch ]);

    const countryDetail = useSelector(state => state.details);
    
    return (
        <div className="details">
        <NavBar/>
        <div className="details_main">
            <div>
            <h1>Name : {countryDetail.name}</h1>
            <h2>ID :{countryDetail.id}</h2>
            <img  className="card_img_details" src={countryDetail.flag} alt=""/>
            </div>
            <div>
            <h2>Continent: {countryDetail.region}</h2>
            <h2>SubRegion: {countryDetail.subregion}</h2>
            <h2>Capital: {countryDetail.capital}</h2>
            <h2>Area: {countryDetail.area}km2 </h2>
            <h2>Population: {countryDetail.population}</h2>
            <h2>Activities: </h2>
            { countryDetail.activities && countryDetail.activities.length > 0 ?
            (countryDetail.activities.map((a) => {
                return <div>
                        <h3>Name: {a.name}</h3>
                        <h3>Difficulty:{a.difficulty}</h3>
                        <h3>Duration:{a.duration}</h3>
                        <h3>Season:{a.seasons}</h3>
                    </div>    
            })) : (
                <div>
                    <h2>Create activity:</h2>
                    <NavLink to="/activity">
                        <button className="btn btn-blue">Create</button>
                    </NavLink>
                </div>
            )
        }
        </div>
        </div>
        </div> 
    )
}
