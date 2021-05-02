import { createReducer, on } from '@ngrx/store';
import { loadUser, loadUserError, loadUserSuccess } from '../actions';
import { User } from '../../models/user.model';

export interface UserState {
  id: string;
  user: User;
  loaded: boolean;
  loading: boolean;
  error: any;
}

const initialState: UserState = {
  id: null,
  user: null,
  loaded: false,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,

  on(loadUser, (state, { id }) => ({ ...state, loading: true, id })),

  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: null,
    user: { ...user },
  })),

  on(loadUserError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: error.url,
      name: error.name,
      message: error.message,
    },
  }))
);
