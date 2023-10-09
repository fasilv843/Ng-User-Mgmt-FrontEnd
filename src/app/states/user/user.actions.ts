import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user.model";


export const retrieveProfile = createAction('[Profile API] API Success')
export const retreiveProfileSuccess = createAction('[Profile API] API SuccessSuccess',props<{userDetails:User}>());

export const retrievePost = createAction('[Post API] API Success')
export const retreivePostSuccess = createAction('[Post API] API SuccessSuccess',props<{allUsers:User[]}>());