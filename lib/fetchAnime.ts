import axios from "axios";
const url=process.env.NEXT_PUBLIC_ANIME_URL

export const fetchDataAnime=async (endpoint:string)=>{
    const {data}=await axios.get(`${url}${endpoint}`)
    return data;
}