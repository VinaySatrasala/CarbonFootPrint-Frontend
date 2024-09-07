import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ObservableInput,
  catchError,
  subscribeOn,
  tap,
  throwError,
} from 'rxjs';
import { AuthService } from '../auth.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  loginError: boolean = false;
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.signinForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signinForm.valid) {
      // Handle sign-in logic here
      let url: string = 'http://localhost:8070/api/v1/users/login';
      this.httpClient
        .post(url, this.signinForm.value)
        .pipe(
          tap((data) => {
            this.authService.loginSuccessHandler(data as any);
          }),
          catchError(this.handleError.bind(this))
        )
        .subscribe();
    } else {
      console.log('Sign In Failed');
      this.validateAllFormFields(this.signinForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  handleError(error: HttpErrorResponse, caught: ObservableInput<any>) {
    if (error) {
      //redundant
      if (error.error) {
        this.loginError = true;
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: { message: 'Invalid Credentials', error: true },
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
        // this.errorMsg = error.error;
        console.log(error.error);
      }
      return throwError(() => {
        throw new Error('something bad happened : ' + error.error);
      });
    }
    return caught;
  }
}
