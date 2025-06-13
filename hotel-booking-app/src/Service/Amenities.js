import { post, put } from '../utils/request'

export const createAmenities =async (options)=> {
    return await post(`amenities/add`,options);
}

export const editAmenities =async (options)=> {
    return await put(`amenities/update`,options);
}