
import { Injectable } from '@angular/core';
import {
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';

import { FireAuthService } from '../service/fire.authservice';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    constructor(
        private authService: FireAuthService,
        private router: Router
    ) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.currentUserValue) {
            return true;
        }
        this.router.navigate(['/authentication/signin']);
        return false;
    }
}