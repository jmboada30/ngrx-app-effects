import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loadUser = createAction(
  '[User Component] loadUser',
  props<{ id: string }>()
);

export const loadUserSuccess = createAction(
  '[User Component] loadUserSuccess',
  props<{ user: User }>()
);

export const loadUserError = createAction(
  '[User Component] loadUserError',
  props<{ error: any }>()
);
