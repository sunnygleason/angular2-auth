//main entry point
import {bootstrap} from 'angular2/platform/browser';
import {App} from './app';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {AuthHttp,AuthConfig} from './angular2-jwt';
import {provide} from 'angular2/core';

// save a jwt token
bootstrap(App, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(AuthConfig, {useValue:  new AuthConfig()}),
  AuthHttp
  ])
  .catch(err => console.error(err));