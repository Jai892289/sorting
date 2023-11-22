import * as types from "./types";

export const fetchAllData = () => ({
    type: types.FETCH_ALL_DATA,
})

export const fetchAllDataSuccess = (data) => ({
    type: types.FETCH_ALL_DATA_SUCCESS,
    payload: data,
})

export const fetchAllDataFailure = (error) => ({
    type: types.FETCH_ALL_DATA_FAILURE,
    payload: error
})