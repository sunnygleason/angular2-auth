import {Injectable, Provider, Component} from 'angular2/core';
import {AuthService} from './auth.service';
import {AuthHttp} from './angular2-jwt';
import 'rxjs/add/operator/map';

@Component({
  selector: 'my-app',
  template: `
    <div class="toolbar">
      <button (click)="auth.login()">Login</button>
      <button (click)="auth.logout()">Logout</button>
      <button (click)="refresh()">Refresh</button>
    </div>
    <h2>All the Fruit</h2>
    <div>{{message}}</div>
    <ul>
      <li *ngFor="#fruit of allFruit">
        <span>{{fruit.name}}</span>
      </li>
    </ul>
  `,
  providers:[AuthService, AuthHttp]
})
export class App {
  constructor(private auth: AuthService,private authHttp: AuthHttp) {}
  login() {
    this.auth.login();
  }
  logout() {
    this.auth.logout();
  }
  refresh() {
    this.authHttp.get('/api/allFruit')
      .map(res => res.json())
      .subscribe(
        allFruit => {
          this.allFruit = allFruit;
          this.message = "All the Fruit loaded successfully.";
        },
        error => {
          console.log(error);
          this.allFruit = [];
          this.message = "Fruit listing not available, please log in.";
        }
      );
  }
}