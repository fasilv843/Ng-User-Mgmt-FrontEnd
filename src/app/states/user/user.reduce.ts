import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/user.model";
import { retreivePostSuccess, retreiveProfileSuccess } from "./user.actions";
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

/////////////////////////////////////////////////////////////

export const initialState: User[] = [];

const _PostReducer = createReducer(
    initialState,
    on(retreivePostSuccess, (state, {allUsers}) => {
        return [...allUsers]
    })
);

export function postReducer(state: any, action:any){
    return _PostReducer(state,action);
}