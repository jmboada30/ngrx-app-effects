import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import * as userActions from '../../store/actions/user.actions';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [],
})
export class UserComponent implements OnInit, OnDestroy {
  user: User;
  loading = false;
  error: any;
  userSubs: Subscription;
  userIdSubs: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userSubs = this.store
      .select('user')
      .subscribe(({ user, loading, error }) => {
        this.user = user;
        this.loading = loading;
        this.error = error;
      });

    this.userIdSubs = this.route.params.subscribe(({ id }) => {
      this.store.dispatch(userActions.loadUser({ id }));
    });
  }
  ngOnDestroy(): void {
    this.userIdSubs.unsubscribe();
  }
}
