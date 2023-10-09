export interface User {
    _id: string
    name: string,
    email: string,
    password: string
    image: string
}

export interface userProfile {
    userDetails: User
}

export interface appUsers {
    allUsers: User[]
}

export interface AuthState{
    isAuthenticated: boolean
}