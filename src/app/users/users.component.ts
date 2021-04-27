import { Component, OnInit } from '@angular/core';
import { PrivilegeService } from '../services/privilege.service';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

users
selectedRoles
updateModal: boolean;
addUserModal: boolean;
userForm: FormGroup;
roles
selectedUser_id
selectedUsers
searchKey

  constructor(private  userService:UserService,
              private fb:FormBuilder,
              private privilegeService: PrivilegeService,
              private toastr:ToastrService,
              private configService :ConfigService) { 
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
    role_id : new FormControl ('',[
          Validators.required
                ])}

        this.userForm = this.fb.group(formControls) ;
      
      }

      get name()  { return this.userForm.get('name') }
      get email()  { return this.userForm.get('email') }
      get role_id()  { return this.userForm.get('role_id') }

  ngOnInit(): void {
          //fetch all users
    this.userService.getusers().subscribe(
      res=>{
this.users = res 
      },err=>{
        console.log(err)
      }
    )

  this.privilegeService.getAllRoles().subscribe(
    res=>{
this.roles= res
    },err=>{
          console.log(err)
    }
  )
  }





addUser(){
 let data = this.userForm.value
 this.userService.addUser(data).subscribe(
   res=>{
this.toastr.success('user added successfully')
this.addUserModal= false
this.ngOnInit()

},err=>{
  if(err.status == 409)
  {
    this.toastr.warning(err.error.message)
  }else{
    this.toastr.error("Serveur issue")
  }
  
})
 
}



ShowaddUserModal()
{
  this.userForm.reset()
  this.addUserModal = true
}


getSelectedUser(user) {
  this.updateModal = true;
  this.selectedUser_id = user.id

  this.userForm.patchValue({
    name: user.name,
    email:user.email,
    role_id : user.role_id
  
  })
}


updateUser()
{
 let data = this.userForm.value

  this.userService.updateUserByAdmin(this.selectedUser_id,data).subscribe(
    res=>{
      this.toastr.success("updated !")
      this.ngOnInit()
  this.updateModal = false;

    }, err => {
      if(err.status == 409)
      {
        this.toastr.warning(err.error.message)
      }
    }
  )

}

delete()
{
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this imaginary file!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!', 
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      let users_id = []
      this.selectedUsers.map(el=>{
       users_id.push({
         "user_id": el.id
       })
      })

      this.userService.deleteUser(users_id).subscribe(
        res=>{
          this.toastr.success("deleted")
          this.ngOnInit()
        }, err=>{
          console.log(err)
        }
      )


      Swal.fire(
        'Deleted!',
        'Your imaginary file has been deleted.',
        'success',
       )
    
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }

  })

}
filterActions(action_name,space_name)
{
 if( this.configService.filterActions(action_name,space_name)){
   return true
 }else{
   return false
 }
}
}
