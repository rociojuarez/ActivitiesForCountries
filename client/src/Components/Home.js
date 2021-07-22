import React, { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getCountries, getActivities } from '../store/actions/countriesActions';
import {CountriesCards} from './CountriesCards'
import { NavBar } from './NavBar';
import { SearchBar } from './SearchBar';


export const Home = () => {
    const dispatch = useDispatch();
    
	const [pages, setPages] = useState(0);
    
    const allCountries = useSelector((state) => state.countries);
    const countriesActivities = useSelector((state) => state.countriesActivities);
    const activities = useSelector((state) => state.activities);
    

    useEffect(() => {
        dispatch(getCountries(pages, order, orderBy, filtro));
	}, [dispatch]);

    useEffect(() => {
        dispatch(getActivities(season));
	}, [dispatch]);
    
    
    //State del orden ASC o DESC (viene del back)
    const [order, setOrder] = useState("ASC");
    const [orderBy, setOrderBy] = useState("name");
    
    const [filtro, setFiltro] = useState('');

    const [season, setSeason] = useState(null);

    //Dispara la accion y llena de paises mi Base de Datos
    useEffect(() => {
        dispatch(getCountries(pages, order, orderBy, filtro));
        dispatch(getActivities(season));
    }, [dispatch, pages,order, orderBy, filtro ]);
	
    //Volver a cargar los paises
    const handlerClick = (e) => {
        e.preventDefault();
        dispatch(getCountries(pages, order, orderBy, filtro));
    } 
    
    //Paginado
    const prev = (e) => {
        e.preventDefault();
        if(pages <= 0) {
            setPages(0);
        } else {
            setPages(pages - 10);
        }
    }

    const next = (e) => {
        e.preventDefault();
        if(allCountries.length < 10) {
            return;
        }else {
            setPages(pages + 10);
        }
    } 

    //Orden ASC o DESC
    const changeOrder = (e) => {
        e.preventDefault();
        setOrder(e.target.value);
    }
    
    const changeOrderBy = (e) => {
        e.preventDefault();
        setOrderBy(e.target.value);
    }

    const changeRegion = (e) => {
       e.preventDefault();
       setFiltro(e.target.value);
   }

   const changeSeason = (e) => {
    e.preventDefault();
    setSeason(e.target.value);
    dispatch(getActivities(e.target.value))
}

const handlerClickSeason = (e) => {
    e.preventDefault();
    dispatch(getActivities(e.target.value));
} 

     
    return (
        <div className="home__main">
            <NavBar/>
            <div className="home__countries">
                <div className="home__sideBar">
                <button
                    className="btn btn-home"
                    onClick={(e) => {
                        handlerClick(e);
                    }} >Reload Database
                </button>
                 <SearchBar/>
                    <div>
                    <h4>Continent:</h4>
                    <select className="btn" onChange={(e) => changeRegion(e)} >
                        <option value="">All</option>
                        <option value="Americas">Americas</option>
                        <option value="Africa">Africa</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Polar">Polar</option>
                    </select>
                    </div>
                    <div>
                    <h4>Activities=</h4>
                    <select className="btn" name="activity" value="null" onChange={(e) => changeSeason(e)} >
                        <option value="All">All</option>
                        <option value="autumn">Autumn</option>
                        <option value="winter">Winter</option>
                        <option value="spring">Spring</option>
                        <option value="summer">Summer</option>
                    </select>
                    <button onSubmit={handlerClickSeason}>Buscar!</button>
                    </div>
                    <div className="orderBy">
                        <h4>Order By:</h4>
                        <label className="btn" onChange={(e) => changeOrderBy(e)}><input type="checkbox" value="name"/>Name</label>
                        <label className="btn" onChange={(e) => changeOrderBy(e)}><input type="checkbox" value="population"/>Population</label>
                    </div>
                    <div className="orderBy">
                        <h4>Way:</h4>
                        <label className="btn" onChange={(e) => changeOrder(e)}><input type="checkbox" value="ASC"/>Asc</label>
                        <label className="btn" onChange={(e) => changeOrder(e)}><input type="checkbox" value="DESC"/>Desc</label>
                    </div>
                </div>
                <div className="home__countriesCards">
                {
                       countriesActivities == '' ?

                        allCountries?.map((country) => {
                            return (
                                <div>
                                    <NavLink to={'/countries/'+country.id}>
                                        <CountriesCards name={country.name} flag={country.flag} region={country.region} key={country.id} />
                                    </NavLink>
                                </div>
                            );
                        })  : countriesActivities.map((country) => {
                            return (
                                <div>
                                    <NavLink to={'/countries/'+country.id}>
                                        <CountriesCards name={country.name} flag={country.flag} region={country.region} key={country.id} />
                                    </NavLink>
                                </div>
                            );
                        })
                }

                    <div className="home__countriesPage">
                    <button
                        className="btn btn-home"
                        onClick={(e) => {
                            prev(e);
                        }}
                        disabled={pages <= 0}
                        >
                            {"<--Prev"}
                    </button>
                    <button
                        className="btn btn-home"
                        onClick={(e) => {
                            next(e);
                        }}
                        >
                            {"Next-->"}
                    </button>
                </div>

                </div>
            </div>
        </div>
    )
}
