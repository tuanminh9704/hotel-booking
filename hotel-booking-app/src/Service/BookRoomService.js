import { post } from '../utils/request'

export const bookRoom =async (options)=> {
    return await post('book-room',options);
}