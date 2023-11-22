import * as types from "./types";

const initialState = {
    data: [],
    loading: false,
    error: false
}

export const getAllData = (state = initialState, action) => {

    switch (action.type) {
        case types.FETCH_ALL_DATA:
            return {
                ...state,
                loading: true,
            }

        case types.FETCH_ALL_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: true,
            }

        case types.FETCH_ALL_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            }
            
        default:
            return state;
    
    }
}

