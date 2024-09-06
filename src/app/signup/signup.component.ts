import { FactorsService } from './../factors.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  countries: string[] = [];
  match: boolean = false;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private factorsService: FactorsService
  ) {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        re_password: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        country: ['', Validators.required],
      },
      {
        validators: this.passwordConfirmationValidator(), // Apply the custom validator to the form group
      }
    );
  }

  ngOnInit(): void {
    this.factorsService.getCountryRecords().subscribe({
      next: (response) => {
        for (let elt of response) {
          this.countries.push(elt['Country']);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });

    // Revalidate confirm password when password field changes
    this.signupForm.get('password')?.valueChanges.subscribe(() => {
      this.signupForm.get('re_password')?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      // Perform additional actions like sending data to a server here
      let url: string = 'http://localhost:8070/api/v1/users/signup';
      this.httpClient
        .post(url, this.signupForm.value)
        .pipe(
          tap((data) => {
            console.log('server response : ' + data);
            this.signupForm.reset();
            this.router.navigate(['/signin']);
          }),
          catchError(this.handleError)
        )
        .subscribe();
    } else {
      console.log('Form is invalid');
      this.validateAllFormFields(this.signupForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  passwordConfirmationValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('re_password');

      if (password && confirmPassword && password.value !== confirmPassword.value) {
        return { passwordsNotMatching: true };
      }
      return null;
    };
  }

  // Handle errors
  handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
