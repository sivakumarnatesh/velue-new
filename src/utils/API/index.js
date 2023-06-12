import axios from 'axios';
// import { API_CALL_BACK } from '../Variables/DefaultData';

export const GetAPI = async(URL) => {
  return axios.get(URL).then((res) =>res).catch((err) => err.message);
}

export const POSTAPI = async(URL,payload) =>  {
  return axios.post(URL,payload).then((res) => res).catch((err) => err);
}

export const PUTAPI = async(URL,payload) => {
  return axios.put(URL,payload).then((res) => res).catch((err) => err);
}

export const DELAPI = async(URL) => {
  return axios.delete(URL).then((res) => res).catch((err) => err);
}
