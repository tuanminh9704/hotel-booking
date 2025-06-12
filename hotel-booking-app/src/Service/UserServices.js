import { post, get, del, patch } from "../utils/request"


export const createUser = async (options) => {
    return await post('auth/register',options);
}

export const delUserById = async (id) => {
    return await del(`users/delete/${id}`);
}

export const login = async (options) => {
    return await post(`auth/login`, options);
}

export const getAllUser = async () => {
    return await get(`users/all`);
}

export const deleteRoom = async (id) => {
    return await del(`rooms/${id}`);
}

export const editRoom = async (id, options) => {
    return await patch(`rooms/${id}`,options);
}
