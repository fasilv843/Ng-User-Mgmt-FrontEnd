import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/user.model";
import { retreiveUsersSuccess, retreiveProfileSuccess } from "./user.actions";
// import { state } from "@angular/animations";


export const userInitialState: User = {
    _id: "",
    name: "",
    email: "",
    password: "",
    image: ""
}

const _ProfileReducer = createReducer(
    userInitialState,
    on(retreiveProfileSuccess, (state,{userDetails}) => {
        return userDetails
    })
)

export function profileReducer(state:any, action: any){
    return _ProfileReducer(state, action)
}

//------------------------------------------------------------//

export const initialState: User[] = [];

const _UsersReducer = createReducer(
    initialState,
    on(retreiveUsersSuccess, (state, {allUsers}) => {
        return [...allUsers]
    })
);

export function usersReducer(state: User[], action:any){
    return _UsersReducer(state,action);
}