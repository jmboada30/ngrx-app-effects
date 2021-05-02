import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loadUsers = createAction('[User Component] loadUsers');

export const loadUsersSuccess = createAction(
  '[User Component] loadUsersSuccess',
  props<{ users: User[] }>()
);

export const loadUsersError = createAction(
  '[User Component] loadUsersError',
  props<{ error: any }>()
);
