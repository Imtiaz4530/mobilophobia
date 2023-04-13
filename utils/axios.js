const { default: axios } = require("axios");
import jwt from "jsonwebtoken";

export const decodeToken = (token) => {
    try {
      const {id} = jwt.decode(token);
      return id;
    } catch (e) {
      console.log(e);
      return null;
    }
};

// export const token = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('token')) : ""



// export const privateRoute = axios.create({
//     baseURL: `http://localhost:1337/api`, 
//     headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//     }
// }) 


export const publicRoute = axios.create({
    baseURL: `http://localhost:1337/api`, 
}) 

export const privateRoute = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
      'Content-Type': 'application/json',
    },
});

privateRoute.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      console.log(token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);