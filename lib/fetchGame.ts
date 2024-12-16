import axios from "axios";
const url="https://api.rawg.io/api"
const apiKey=process.env.NEXT_PUBLIC_RAWG_API_KEY
export const fetchDataGame=async (endpoint:string)=>{
    const {data}=await axios.get(`${url}/${endpoint}?key=${apiKey}`)
    return data;
}