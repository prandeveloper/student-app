import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://edumatelive.in/studentadmin/newadmin/',
});

export default instance;
