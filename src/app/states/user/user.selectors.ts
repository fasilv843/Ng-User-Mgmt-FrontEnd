import { createSelector } from "@ngrx/store";
import { User, appUsers, userProfile } from "src/app/models/user.model";


export const profileRootSelector = (state:userProfile) => state.userDetails
export const userProfileSelector = createSelector(
    profileRootSelector,
    (userDetails:User) => {
        return userDetails
    }
)

export const userRootSelector = (state:appUsers)=> state.allUsers;
export const usersSelector = createSelector(
  userRootSelector,
  (allusers:User[])=>{
    console.log(allusers);
    return [...allusers]
  }
)