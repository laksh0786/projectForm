import { axiosInstance } from "./axiosConfig";


//add data controller
export const addMachineHealthDataController = (obj)=>{

    return axiosInstance.post( '/machine-health/add-data' , obj);

}


//get particular data controller
export const getParticularMcHealthDataController = (id)=>{

    return axiosInstance.get( '/machine-health/get-by-id/'+ id);

}


//get all forms data controller
export const getAllMachineHealthDataController = ()=>{

    return axiosInstance.get('/machine-health/get-all');

}


//verify form controller
export const verifyMcHealthFormController = (id, obj)=>{
    return axiosInstance.put( '/machine-health/verify-form/'+id , obj);
}

