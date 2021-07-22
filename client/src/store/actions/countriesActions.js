import axios from 'axios';
import { types } from '../types/types';

export function getCountriesDB() {
    return async function(dispatch) {
        var json = await axios.get('http://localhost:3001/countries/')
        return dispatch({type:types.get_countries, payload: json.data});       
        };   
}

export function getActivities(season) {
    return async function(dispatch) {
        var json = await axios.get('http://localhost:3001/activity?filter='+season)
        return dispatch({type: types.get_activities, payload: json.data});       
        };   
}
 

export function getCountries(page, order, orderBy, region) {
    return async function(dispatch) {
        var json = await axios.get('http://localhost:3001/countries?page='+page+'&order='+order+'&orderBy='+orderBy+'&filter='+region)
        return dispatch({type: types.get_countries, payload: json.data});       
        };   
}

export function getNameCountries(name) {
    return async function (dispatch) {
        try {
            var json = await axios('http://localhost:3001/countries?name='+name);
            return dispatch({type: types.get_name_country, payload: json.data});
        } catch (error) {
            console.log(error);
        }
    }
}

export function getDetail(id) {
    return async function(dispatch) {
        try {
            var json= await axios('http://localhost:3001/countries/'+id)
            return dispatch({type:types.get_details, payload:json.data})
        } catch (error) {
            console.log(error)
        }
    }
}

export function getNameCountriesForm(name) {
    return async function (dispatch) {
        try {
            var json = await axios('http://localhost:3001/countries?name='+name);
            return dispatch({type: types.get_country_form, payload: json.data});
        } catch (error) {
            console.log(error);
        }
    }
}

export function clearActivityForm() {
    return function (dispatch) {
        return dispatch({type: types.clear_countries_fost});
    }
} 

export function postActivity(name, difficulty, duration, seasons, countriesId){
    return async function () {
        const response = await axios.post('http://localhost:3001/activity',{
            name,
            difficulty,
            duration,
            seasons,
            countriesId
        });
        //console.log(response);
        return ( response);
    }
} 




