import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanLoad, Route } from '@angular/router';

import { AuthorizeQuery } from '../state/authorize/authorize.query';
import {AuthorizeStore}from '../state/authorize/authorize.store';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  isLoggedIn = false;
  constructor(private authQuery: AuthorizeQuery,private store: AuthorizeStore, private router: Router) {


        //select(state => state.token).subscribe(res => this.token = res);
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

    this.authQuery.isLoggedIn$.toPromise().then(res => { this.isLoggedIn = res;});
    if (this.isLoggedIn)  {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }

}
