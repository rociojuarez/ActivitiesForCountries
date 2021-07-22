import { types } from "../types/types"


const initialState = {
    countries: [],
    details: [],
    countriesForm: [],
    countriesActivities: [],
    activities:[]
}

export const rootReducer= (state = initialState, action) => {
    switch(action.type){
        case types.get_countries:
            return {
                ...state,
                countries: action.payload
            }
            case types.get_name_country:
            return {
                ...state,
                countries:action.payload
            } 
            case types.get_details: 
                return {
                ...state,
                details: action.payload
            }
        case types.clear_countries_fost:
            return{
                ...state,
                countriesForm:[]
            }
        case types.get_country_form:
            return {
                ...state,
                countriesForm: action.payload
            } 
        case types.post_Activities:
            return {
                ...state,
                activities:  action.payload
            }
       case types.get_activities:
            return {
                ...state,
                countriesActivities: action.payload
            } 
        default:
        return state;
    }
}