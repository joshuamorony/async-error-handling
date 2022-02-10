import { Component } from '@angular/core';
import { of } from 'rxjs';
import { catchError, ignoreElements } from 'rxjs/operators';
import { UserService } from '../shared/data-access/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user$ = this.userService.getUser();
  userError$ = this.user$.pipe(
    ignoreElements(),
    catchError((err) => of(err))
  );

  constructor(public userService: UserService) {}
}
