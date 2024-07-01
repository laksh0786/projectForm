const {axiosInstance} = require('./axiosConfig');



//add data controller
export const addcbfController = (obj)=>{

    return axiosInstance.post( '/cbf/add-cbf' , obj);

}