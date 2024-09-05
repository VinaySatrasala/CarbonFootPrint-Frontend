import { FactorsService } from './../factors.service';
import { Component, ErrorHandler, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, ObservableInput, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  countries: string[] =[];

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private factorsService : FactorsService
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      re_password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          this.passwordConfirmationValidator(),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
    });
  }

  ngOnInit(): void {
      this.factorsService.getCountryRecords().subscribe({
        next:(response) => {

            for(let elt of response){
              this.countries.push(elt['Country'])
            }
        },
        error:(err)=>{
          console.error(err)
        }
      })
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
      if (
        this.signupForm &&
        this.signupForm.get('password') &&
        this.signupForm.get('re_password') &&
        this.signupForm.get('password')?.value !=
          this.signupForm.get('re_password')?.value
      ) {
        return {
          passwordsNotMatching: true,
        };
      } else return null;
    };
  }

  //handle errors
  handleError(error: HttpErrorResponse, caught: ObservableInput<any>) {
    if (error) {
      //redundant
      if (error.error) console.log(error.error);
      return throwError(() => {
        new Error('something bad happened : ' + error.error);
      });
    }
    return caught;
  }
}
