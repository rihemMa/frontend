import { Component, OnInit } from '@angular/core';
import { Api } from '../api';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

url =  new Api()
constructor(private userService : UserService,
  private router : Router, 
  private toaster:ToastrService,
  private fb:FormBuilder,) {

      let formControls = {

        email : new FormControl('',[
           Validators.required,
           Validators.email
             ]),
        password : new FormControl('',[
          Validators.required,
          Validators.pattern("[A-Z a-z 0-9 .'-]+"),
          Validators.minLength(4),
          Validators.maxLength(20)
                ]),
   }
   this.loginForm = this.fb.group(formControls) ;

  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }



  ngOnInit(): void {
    let isLogged = this.userService.islogged();
    if(isLogged)
    {
         this.router.navigate(['/'])
    }
  }



      login()
      {
        let email = this.loginForm.get('email').value
        let password = this.loginForm.get('password').value
      this.userService.login(email,password).subscribe(
        res => {


        
          let token = res.token
          let user = res.user
          let privileges = res.privileges
              console.log(res);
              
          localStorage.setItem('token',token);
          localStorage.setItem('user',JSON.stringify(user));
          localStorage.setItem('privileges',JSON.stringify(privileges));
            this.router.navigate(['/'])
            this.toaster.success('welcome!')
     
        
        
              
      },err=>{

         if(err.status == 403)
         {
          this.toaster.error('Invalid Credentials')

         }else{
          this.toaster.error('serveur issues')

         }

      })
      }



}
