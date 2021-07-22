import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearActivityForm, getNameCountriesForm, postActivity } from '../store/actions/countriesActions';
import { NavBar } from './NavBar';

export const Activity = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const country = useSelector(state => state.countriesForm);

    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState();
    const [duration, setDuration] = useState();
    const [seasons, setSeasons] = useState("");
    const [countriId, setCountriId] = useState([]);
    const [countryName, setCountryName] = useState('');
    const [countriesObj, setCountriesObj] = useState([]);


   useEffect(() => {
        setCountriesObj([...countriesObj, ...country]);
        setCountriId([...new Set(countriesObj.map(c=>c.id))]);
    }, [dispatch, country]);

   useEffect(() => {
        setCountriId([...new Set(countriesObj.map((c)=>c.id))]);
    }, [dispatch, countriesObj]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postActivity(name, difficulty, duration, seasons, countriId));
        alert("La actividad se ha creado");
        dispatch(clearActivityForm());
        history.push('/countries');
    }
    const handleName = (e) => {
        e.preventDefault();
        setName(e.target.value)
    }
 
     const handleDifficulty = (e) => {
        e.preventDefault();
        setDifficulty(e.target.value)
    } 
    
    const handleDuration = (e) => {
        e.preventDefault();
        setDuration(e.target.value)
    }
    
    const handleSeasons = (e) => {
        e.preventDefault();
        setSeasons(e.target.value)
    }

    const handleCountryName = (e) => {
        e.preventDefault();
        setCountryName(e.target.value);
    }

    const getCountryName = async (e) => {
        e.preventDefault();
        dispatch(getNameCountriesForm(countryName));
    }

    const deletedCountry = async (e, id) => {
        e.preventDefault();
        console.log(id);
        setCountriesObj(countriesObj.filter(c => c.id !== id));
        setCountriId([...new Set(countriesObj.map(c => c.id))]);
    } 

    return (
        <div className="activity__main">
                <NavBar/>
            <div className="activity__form">
                <h1>Create Activity</h1>
                    <form onSubmit={(e) => {handleSubmit(e)}}>
                    <div className="activity_name">
                        <h4>Activity Name=</h4>
                        <input
                            type="text"
                            name="name"
                            placeholder='Example Surf'
                            onChange={(e) => {handleName(e)}}
                        />
                    </div>
                    <div className="activity_diff">
                    <h4>Difficulty (1-Easy / 5-Hard)=</h4>
                    <select className="btn" name="difficulty" onChange={(e) => handleDifficulty(e)}>
                    <option value="0" name="difficulty">0</option>
                        <option value="1" name="difficulty">1</option>
                        <option value="2" name="difficulty">2</option>
                        <option value="3" name="difficulty">3</option>
                        <option value="4" name="difficulty">4</option>
                        <option value="4" name="difficulty">5</option>
                    </select> 
                    </div>
                    <div className="activity_duration">
                    <h4>Duration (In Minutes)=</h4>
                        <input
                            type="number"
                            name="duration" 
                            placeholder='Duration'
                            onChange={(e) => {handleDuration(e)}}
                        />
                    </div>
                    <div className="activity_season">
                    <h4>Season=</h4>
                    <select className="btn" name="seasons" onChange={(e) => handleSeasons(e)}>
                        <option value="autumn">Autumn</option>
                        <option value="winter">Winter</option>
                        <option value="spring">Spring</option>
                        <option value="summer">Summer</option>
                    </select>
                    </div>
                      
                    <div className="activity_countries">
                    <label>Countries=</label>
                    <input
                        type="text"
                        placeholder='Name'
                        onChange={(e) => {handleCountryName(e)}}
                    />
                <button onClick={(e) => getCountryName(e)}>
                Search Country
                </button> 
                </div>
                    <div className="countries_container">
                        <div className="activity_countries__Card">
                        {
                            countriesObj?.map((c) => (
                                <div key={c.id}>
                                    <div className="card_text">
                                    <h4 className="card_text">{c.name}</h4>
                                    <button onClick={(e) => deletedCountry(e, c.id)}>x</button>
                                    </div>
                                    <img className="card_img" src={c.flag} alt="" width="170px" height="170px"/>
                                </div>
                            ))
                        } 
                    </div>
                    </div> 
                    <div className="activity_submit">
                    <button type="submit" className="btn btn-activity" onClick={(e) => {handleSubmit(e)}}>Create!</button>
                    </div>
                </form> 
                </div> 
            </div>
    )
}
