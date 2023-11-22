import axios from "axios";

export const getAllDataApi = () => {
    return axios.get("https://fakestoreapi.com/products")
}