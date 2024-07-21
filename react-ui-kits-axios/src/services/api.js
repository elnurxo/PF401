import axios from "axios";
import { BASE_URL } from "./constants";

//get all
export async function getAll(endpoint) {
  let response = { data: null, error: null, loading: true };

  await axios
    .get(`${BASE_URL}/${endpoint}`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((err) => {
      response.error = err;
    })
    .finally(() => {
      response.loading = false;
    });

  return response;
}

//get one
export async function getOne(endpoint, id) {
    let response = { data: null, error: null, loading: true };
  
    await axios
      .get(`${BASE_URL}/${endpoint}/${id}`)
      .then((res) => {
        response.data = res.data;
      })
      .catch((err) => {
        response.error = err;
      })
      .finally(() => {
        response.loading = false;
      });
  
    return response;
}

//delete
export async function deleteOne(endpoint, id){
    let response = null;
    await axios.delete(`${BASE_URL}/${endpoint}/${id}`)
    .then((res)=>{
        response = res.data;
    })

    return response;
}

//patch
export async function patchOne(endpoint, id, payload){
    let response = null;

    await axios.patch(`${BASE_URL}/${endpoint}/${id}`, payload)
    .then((res)=>{
        response = res.data;
    })

    return response;
}

//put
export async function putOne(endpoint, id, payload){
    let response = null;

    await axios.put(`${BASE_URL}/${endpoint}/${id}`, payload)
    .then((res)=>{
        response = res.data;
    })

    return response;
}

//post
export async function post(endpoint, payload){
    let response = null;

    await axios.post(`${BASE_URL}/${endpoint}`, payload)
    .then((res)=>{
        response = res;
    })

    return response;
}
