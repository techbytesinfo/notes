import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { FireAuthService } from "@core/service/fire.authservice";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  hide = true;
  chide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private fireAuthService: FireAuthService,
    private snackbar: MatSnackBar
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ["", Validators.required],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      this.router.navigate(["/admin/dashboard/main"]);
    }
  }

  signUp() {
    this.fireAuthService
      .register(this.f["email"].value, this.f["password"].value)
      .then(
        (res) => {
          this.snackbar.open("User Created Successfully", "Close", {
            duration: 2000,
          });
        },
        (error) => {
          this.snackbar.open(error.message, "Close", {
            duration: 2000,
          });
        }
      );
  }
}
