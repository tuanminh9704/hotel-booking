import { post, get, del, patch } from "../utils/request"


export const createUser = async (options) => {
    return await post('auth/register',options);
}

export const getUserByEmail = async (email) => {
    return await get(`auth/user?email=${email}`);
}

export const login = async (options) => {
    return await post(`auth/login`, options);
}

export const getUserByPhone = async (phone) => {
    return await get(`auth/user?phone=${phone}`);
}

export const deleteRoom = async (id) => {
    return await del(`rooms/${id}`);
}

export const editRoom = async (id, options) => {
    return await patch(`rooms/${id}`,options);
}
