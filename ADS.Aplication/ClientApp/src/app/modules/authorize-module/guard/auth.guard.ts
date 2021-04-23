import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanLoad, Route } from '@angular/router';

import { AuthorizeQuery } from '../state/authorize/authorize.query';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  isLoggedIn = false;
  constructor(protected authQuery: AuthorizeQuery, private router: Router) {
    authQuery.isLoggedIn$.subscribe(res => this.isLoggedIn = res);
   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {

    console.log(this.isLoggedIn + 'is logged');
    if (this.isLoggedIn)  {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }

}
