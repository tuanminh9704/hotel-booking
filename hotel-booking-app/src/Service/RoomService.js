import { post, get, del, patch } from "../utils/request"


export const createRoom = async (options) => {
    return await post('rooms',options);
}

export const getListRoom = async () => {
    return await get('rooms');
}

export const deleteRoom = async (id) => {
    return await del(`rooms/${id}`);
}

export const editRoom = async (id, options) => {
    return await patch(`rooms/${id}`,options);
}
