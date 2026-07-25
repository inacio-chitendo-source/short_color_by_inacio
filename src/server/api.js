import { status } from "../components/loading";

export const BASE_URL = "http://web.most.com";
export const api = {
    auth:  async (endpoint, data) =>{
        try{
            const res = await fetch(`${BASE_URL}${endpoint}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body : JSON.stringify(data)
            });
            if(!res.ok) throw new Error(`Erro ${res.status}`);
            status('A');
            return await res.json();
        } catch(err){
            if(err =  "TypeError: Failed to fetch"){
               status(err);
            }
            return null;
        }
    },
    get: async (endpoint) =>{
        try{
            const res = await fetch(`${BASE_URL}/${endpoint}`, {
                headers:{
                    "Authorization": "Inacio " + localStorage.getItem('token')
                }
            });
            if(!res.ok) throw new Error(`Erro ${res}`);
             
            status('A');
            return await res.json();
        }catch(err){
            if(err =  "TypeError: Failed to fetch"){
               status(err);
            }
            return null;
        }
    },
    post: async (endpoint, data) =>{
        try{
            const res = await fetch(`${BASE_URL}/${endpoint}`, {
                method: 'POST',
                headers: {
                    "Authorization": "Inacio " + localStorage.getItem('token')
                },
                body: data,
            });
            if(!res.ok) throw new Error(`Erro ${res.status}`);
            return await res.json();
        } catch(err){
            console.error(err);
            if(err =  "TypeError: Failed to fetch"){
               status(err);
            }
            return null;
        }
    },
    put: async (endpoint, data) =>{
        try{
            const res = await fetch(`${BASE_URL}/${endpoint}`, {
                method: 'PUT',
                headers: {
                    "Authorization": "Inacio " + localStorage.getItem('token')
                },
                body: JSON.stringify(data),
            });
            if(!res.ok) throw new Error(`Erro ${res.status}`);
            status('A');
            return await res.json();
        } catch(err){
            console.error('Erro: ',err);
            if(err =  "TypeError: Failed to fetch"){
               status(err);
            }
            return null;
        }
    },
    delete: async (endpoint) =>{
        try{
            const res = await fetch(`${BASE_URL}/${endpoint}`, {
                method: 'DELETE',
                headers:{
                    "Authorization": "Inacio " + localStorage.getItem('token')
                }
            });
            if(!res.ok) throw new Error(`Erro ${res.status}`);
            status('A');
            return await res.json();
        }catch(err){
            console.error(err);
            if(err =  "TypeError: Failed to fetch"){
               status(err);
            }
            return null;
        }
    },
};
 
export default api;