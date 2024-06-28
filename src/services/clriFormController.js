import { axiosInstance } from "./axiosConfig";


//add data controller
export const addController = (obj)=>{

    return axiosInstance.post( '/clri/add-clri' , obj);

}

//get particular data controller
export const getParticularDataController = (id)=>{

    return axiosInstance.get( '/clri/get-clri-form/'+ id);

}
//get all forms data controller
export const getAllController = (obj)=>{

    return axiosInstance.get('/clri/get-clri');

}
