import { post } from '../utils/request'

export const bookRoom =async (options)=> {
    return await post('bookings',options);
}