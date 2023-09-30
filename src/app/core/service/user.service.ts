// write a user service to get the user data from the server

// Path: src/app/core/service/user.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private firestore: AngularFirestore) {}

    get(uid: string) {
        return this.firestore.collection('users').doc<User>(uid).valueChanges();
    }
}


// Path: src/app/core/service/fire.authservice.ts
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
// import { User } from '../models/user';
// import { UserService } from './user.service';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
