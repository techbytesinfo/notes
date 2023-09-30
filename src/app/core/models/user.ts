export class User {
  id!: number;
  img!: string;
  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  token!: string;
  email!: string;
}

export class IUser {
  uid!: string;
  email!: string;
  displayName!: string;
  photoURL!: string;
  emailVerified!: boolean;
}