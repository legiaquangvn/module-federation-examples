import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { User, UserState, RemoveUser } from 'mdmf-shared-libs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shell-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  @Select(UserState.getUsers) users: Observable<User[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  /**
   * Handle the remove user when the "Remove User" button is clicked
   * @param user: the user info
   */
  removeUser(user: User): void {
    this.store.dispatch(new RemoveUser(user));
  }

  /**
   * Get the users for unit testing purposes
   */
  getUsers(): User[] {
    return this.store.selectSnapshot<User []>((state) => state.users.users);
  }

}
