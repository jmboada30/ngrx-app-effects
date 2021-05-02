import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as userActions from '../actions';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userS: UserService) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUser),
      mergeMap((action) =>
        this.userS.getUserById(action.id).pipe(
          map((user) => userActions.loadUserSuccess({ user })),
          catchError((error) => of(userActions.loadUserError({ error })))
        )
      )
    )
  );
}
