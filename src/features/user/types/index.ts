export type UserAttributes = {
    userId: string,
    name: string,
    companyName: string,
    address: string,
    city: string
    country: string
    logo?: string
}

export type UserState = {
    currentUser: UserAttributes 
    isAuthenticated: boolean
}

export type UserAction = {
    currentUser: UserAttributes
    isAuthenticated: boolean
}