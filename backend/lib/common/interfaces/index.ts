import {ApiError} from "../utils/apiError";


export interface TableOptions {
    pageNumber: number,
    pageSize: number,
    filter: string,
    sortOrder: string
}


export interface FormatResponse {
    success: boolean
    payload?: any,
    message?: any
}



