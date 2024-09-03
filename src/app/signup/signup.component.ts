import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http"
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  countries: string[] = ['United States', 'Canada', 'Australia'];


  constructor(private fb: FormBuilder,private httpClient : HttpClient) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      re_password:['', [Validators.required, Validators.minLength(6),this.passwordConfirmationValidator()]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],

    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Form Submitted!', this.signupForm.value);
      // Perform additional actions like sending data to a server here
      let url:string = "http://localhost:8070/api/v1/users/signup"
      this.httpClient.post(url,this.signupForm.value).subscribe((data)=>{
        console.log(data)
      })

    } else {
      console.log('Form is invalid');
      this.validateAllFormFields(this.signupForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  passwordConfirmationValidator() : ValidatorFn{
    return (control:AbstractControl):ValidationErrors|null=>{
      if(this.signupForm&&this.signupForm.get("password")&&this.signupForm.get("re_password")&&
        this.signupForm.get("password")?.value!=this.signupForm.get("re_password")?.value){
        return {
          passwordsNotMatching:true
        }
      }
      else
      return null;
    }
  }


}
