import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token
  passWordForm: FormGroup
  isChecked 
  constructor(private activatedRoute : ActivatedRoute ,
              private router : Router ,private fb: FormBuilder,
              private userService : UserService,
              private toastr : ToastrService ) {
    let formControls = {

      password: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Z a-z 0-9 .'-]+"),
        Validators.minLength(4),
        Validators.maxLength(16)
      ]),
      Confirm_password: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Z a-z 0-9 .'-]+"),
        Validators.minLength(4),
        Validators.maxLength(16)
      ]),
    }
    this.passWordForm = this.fb.group(formControls);
   }
   get password() { return this.passWordForm.get('password') }
   get Confirm_password() { return this.passWordForm.get('Confirm_password') }


  async ngOnInit() {
  this.token =  this.activatedRoute.snapshot.params.token
  await this.userService.checkToken(this.token).then(
    res => {
              this.isChecked = res.isChecked
            }, err => {
      console.log(err);
      
    }
  ) ;
    
  }

  save()
  {
   let password = this.passWordForm.get('password').value
    this.userService.resetPassword(password,this.token).subscribe(
      res => {
        this.router.navigate(['/login'])
        this.toastr.success('Password changed!')
        
      }, err => {
        console.log(err)})
    
  }


}
