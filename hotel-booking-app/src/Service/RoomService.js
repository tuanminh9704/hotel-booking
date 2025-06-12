import { post, get, del, patch } from "../utils/request";

export const createRoom = async (options) => {
    return await post('rooms', options);
};

export const getRoomById = async (id) => {
    return await get(`rooms/room-by-id/${id}`);
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