export type AuthUser  = {
    userId: string,
    name: string,
    companyName: string,
    address: string,
    city: string
    country: string
    logo?: string
}

export interface RegisterCredentialsDTO {
    name: string,
    companyName: string,
    email: string,
    password: string,
    address: string,
    city: string
    country: string
    logo?: string
    confirmPassword?: string
}

export interface LoginCredentialsDTO {
    email: string
    password: string
}

export interface UserResponse {
    message: AuthUser
}
  