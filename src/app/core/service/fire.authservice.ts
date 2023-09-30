import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from './user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
 providedIn: 'root',
})
export class FireAuthService {
 user$: Observable<any>;
 private userDetails: any;
 private currentUserSubject: BehaviorSubject<User>;
 public currentUser: Observable<User>;

 constructor(
   private afAuth: AngularFireAuth,
   private router: Router,
   private userService: UserService
 ) {
   this.user$ = this.afAuth.authState.pipe(
     switchMap((user) => {
       if (user) {
         return this.userService.get(user.uid);
       } else {

         return of(null);
       }
     })
   );
   this.currentUserSubject = new BehaviorSubject<User>(
     JSON.parse(localStorage.getItem('currentUser') || '{}')
   );
   this.currentUser = this.currentUserSubject.asObservable();
 }

 public get currentUserValue(): User {
   return this.currentUserSubject.value;
 }

 async login(email: string, password: string) {
   const credential = await this.afAuth.signInWithEmailAndPassword(
     email,
     password
   );
   this.userDetails = credential.user;
   localStorage.setItem('currentUser', JSON.stringify(this.userDetails));
   this.currentUserSubject.next(this.userDetails);
   return this.userDetails;
 }

 async register(email: string, password: string) {
   const credential = await this.afAuth.createUserWithEmailAndPassword(
     email,
     password
   );
   this.userDetails = credential.user;
   localStorage.setItem('currentUser', JSON.stringify(this.userDetails));
   this.currentUserSubject.next(this.userDetails);
   return this.userDetails;
 }

 async logout() {
   await this.afAuth.signOut();
   localStorage.removeItem('currentUser');
   this.currentUserSubject.next(this.currentUserValue);
   this.router.navigate(['/authentication/signin']);
   return of({ success: false });
 }
}
