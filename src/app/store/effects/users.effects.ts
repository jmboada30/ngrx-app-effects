import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as usersActions from '../actions/users.actions';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userS: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.loadUsers),
      mergeMap(() =>
        this.userS.getUsers().pipe(
          map((users) => usersActions.loadUsersSuccess({ users })),
          catchError((error) => of(usersActions.loadUsersError({ error })))
        )
      )
    )
  );
}
