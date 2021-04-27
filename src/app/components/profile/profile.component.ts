import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Api } from '../../api'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users
  userForm: FormGroup;
  passwordForm: FormGroup;
  userId
  user
  passwordChange
  isCorrect = false
  path
  userObj
  files
  id
  api = new Api
  fileGenralLink = this.api.url

  constructor(private userService: UserService,
    private toastr: ToastrService ,
    private fb:FormBuilder,) {
    let formControls = {

      name : new FormControl('',[
         Validators.required,
         Validators.pattern("[A-Z a-z 0-9 .'-]+"),
         Validators.minLength(4),
         Validators.maxLength(20)
           ]),

      email : new FormControl ('',[
            Validators.required,
            Validators.email
          ]),
      phone_number : new FormControl ('',[
            Validators.required,
            Validators.pattern("[0-9 .'-]+"),
          ]),
      password : new FormControl ('',[
            Validators.required,
            Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                  ]),
      description: new FormControl ('',[
        Validators.required,
        Validators.pattern("[A-Z a-z 0-9 .'-]+"),
              ]),
              photo: new FormControl ('',[
                Validators.required,
                      ]),
            }
            let formControl = {

              oldPass : new FormControl('',[
                 Validators.required,
                   ]),

              newPass : new FormControl ('',[
                Validators.required,
                Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                Validators.minLength(8),
                  ]),
              confirmNew : new FormControl ('',[
                 Validators.required,
                 Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                 Validators.minLength(8),
                  ]),

                    }

        this.userForm = this.fb.group(formControls) ;
        this.passwordForm = this.fb.group(formControl) ;
  }
  //user
      get name(){ return this.userForm.get('name') }
      get phone_number(){ return this.userForm.get('phone_number') }
      get email(){ return this.userForm.get('email') }
      get password(){ return this.userForm.get('password') }
      get description(){ return this.userForm.get('description') }
      get photo(){ return this.userForm.get('photo') }

  //password
      get oldPass(){ return this.passwordForm.get('oldPass') }
      get newPass(){ return this.passwordForm.get('newPass') }
      get confirmNew(){ return this.passwordForm.get('confirmNew') }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    

    this.userService.getUserById(this.user.id).subscribe(
      res=>{
        this.user = res
        this.path = this.user.photo
        this.userForm.patchValue({
          name: this.user.name,
          email : this.user.email,
          password : this.user.password,
          phone_number:this.user.phone_number,
          description:this.user.description,
          photo:this.user.photo,
         })

      },err=>{
        console.log(err);
      }
    )
  }

  selectFile(event) {
    this.files = event.target.files[0]
  }

  clear(){
    this.userForm.reset();
    this.toastr.error("Profile infos are cleared,rewrite your infos and save!")
  }


async   updateProfile()
{
  let status
    let currentPassword = this.passwordForm.get('oldPass').value
    let newPass = this.passwordForm.get('newPass').value
    if( newPass )
    {
 await    this.userService.updatePassword(  currentPassword, newPass).then(
      res => {
     status = res.status
     

      if(res.status == 0){
        this.isCorrect = false
        this.toastr.error('old  password is wrong!')

      }else {
      this.passwordForm.reset()
      this.isCorrect  = true

      }
      }, err => {
        console.log(err);
      }
    )

    }
    if(this.isCorrect || !newPass){
    let formData = new FormData();
    let path = ''
    if(this.files){
      (formData.append("file",this.files,this.files.name))
     await  this.userService.uploadFile(formData).then(
      res => {
        path = res.path
        // console.log(path)
        }, err => { console.log(err);})
 console.log("test");
 
      }
    let data = this.userForm.value
    this.userService.updateUser(data,path).subscribe(
      res => {
        // console.log(this.userId);
        this.toastr.success("User Profile Infos Are Updated!")
        this.ngOnInit()
          }, err => { console.log(err) }
          )
   } 
  }
}
