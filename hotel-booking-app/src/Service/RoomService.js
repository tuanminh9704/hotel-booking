import { post, get, del, patch } from "../utils/request";

export const createRoom = async (options) => {
    return await post('rooms', options);
};

export const getListRoom = async () => {
    return await get('rooms');
};

export const deleteRoom = async (id) => {
    return await del(`rooms/${id}`);
};

export const editRoom = async (hotelId, options) => {
    return await patch(`hotels/${hotelId}`, options);
};


export const editHotel = async (id,options) => {
    return await patch(`hotels/${id}`, options);
};