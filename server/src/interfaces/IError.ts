export interface IError extends Error{
    status?: number;
    code?: number | string
}