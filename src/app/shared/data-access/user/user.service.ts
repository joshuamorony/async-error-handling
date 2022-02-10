import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { concatMap, delay, shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiExample: Observable<any>;
  private apiErrorExample: Observable<any>;

  constructor(private http: HttpClient) {}

  getFromAPI() {
    // This creates a hot observable and we cache it on a class member
    // so that multiple subscribers don't trigger multiple requests
    if (!this.apiExample) {
      this.apiExample = this.http
        .get('https://jsonplaceholder.typicode.com/todos/1')
        .pipe(
          tap(() => console.log('setting up stream!')),
          shareReplay(1)
        );
    }

    return this.apiExample;
  }

  getFromAPIError() {
    if (!this.apiErrorExample) {
      // intentional typo in URL to trigger error
      this.apiErrorExample = this.http
        .get('https://jsonplaceholde.typicode.com/todos/1')
        .pipe(
          tap(() => console.log('setting up stream!')),
          shareReplay(1)
        );
    }

    return this.apiErrorExample;
  }

  getUser() {
    return of('Josh').pipe(delay(2000));
  }

  getUserWithError() {
    return of('Josh').pipe(
      delay(2000),
      tap(() => {
        throw new Error('Could not fetch user');
      })
    );
  }

  getTemporalUser() {
    return of('Josh', 'Greg', 'oops', 'Josh').pipe(
      concatMap((user) => of(user).pipe(delay(2000))),
      tap((user) => {
        if (user === 'oops') {
          throw new Error('Could not fetch user');
        }
      })
    );
  }
}
