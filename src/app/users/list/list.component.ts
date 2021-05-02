import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import * as usersActions from '../../store/actions/users.actions';
import { AppState } from 'src/app/store/app.reducers';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [],
})
export class ListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  loading = false;
  error: any;
  userSubs: Subscription;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.userSubs = this.store
      .select('users')
      .subscribe(({ users, loading, error }) => {
        this.users = users;
        loading = loading;
        this.error = error;
      });

    this.store.dispatch(usersActions.loadUsers());
  }

  onClick(id: string) {
    if (!id) return;
    this.router.navigate(['/user', id]);
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
}
