import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/@api/auth/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild {

    constructor(
        private authenticationService: AuthenticationService,
    ) {
        // no-op
    }

    public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return false;
        // return this.isUserAuthenticated(state.url);
    }

    public canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return false;
        // return this.isUserAuthenticated(state.url);
    }

    // private isUserAuthenticated(url: string): boolean {
    //     if (this.authenticationService.authenticated) {
    //         return true;
    //     }

    //     this.authenticationService.redirectUrl = url;
    //     this.authenticationService.logout();
    //     return false;
    // }

}
