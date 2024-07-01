import axios from "axios";

const baseURL = "http://localhost:5000";
// const baseURL = "https://project-form-backend.onrender.com";

const axiosInstance = axios.create({baseURL});



export {axiosInstance ,  baseURL};