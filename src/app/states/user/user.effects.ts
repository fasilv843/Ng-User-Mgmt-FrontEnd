import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from 'src/app/services/user.service';
import { retreiveUsersSuccess, retreiveProfileSuccess, retrieveUsers, retrieveProfile } from './user.actions';
import { User } from 'src/app/models/user.model';
import { switchMap, map } from 'rxjs'

@Injectable()
export class userEffects{

    constructor(
        private actions$: Actions,
        private userService: UserService
    ){}

    loadProfile$ = createEffect( () => (
        this.actions$.pipe(
            ofType(retrieveProfile),
            switchMap( () => {
                return this.userService.loadProfile().pipe(
                    map(data => retreiveProfileSuccess({userDetails: data as User}))
                )
            })
        )
    ))

    loadAllUsers$ = createEffect( () => 
        this.actions$.pipe(
            ofType(retrieveUsers),
            switchMap( () => {
                return this.userService.laodUsers().pipe(
                    map((data) => retreiveUsersSuccess({allUsers: data as User[]}))
                )
            })
        )
    )
}

