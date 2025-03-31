import { get } from '../utils/request'

export const getHotels = async () =>{
    return await get(`hotels`);
}

export const getRating = async () =>{
    return await get(`hotels`);
}