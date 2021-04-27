import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import { PaperTypeService } from 'src/app/services/paper-type.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-add-paper-type',
  templateUrl: './add-paper-type.component.html',
  styleUrls: ['./add-paper-type.component.css']
})
export class AddPaperTypeComponent implements OnInit {
  typeForm : FormGroup
  checked
  paperTypes 
  selectedTypes
  addTypeModal
  updateTypeModal
  displayBasic
  showMailForm
  selectedType
  searchKey
  constructor(private fb:FormBuilder,private paperTypeSrvice :PaperTypeService,private toastr : ToastrService) 
  {
    let formControls = {

    type_name  : new FormControl('',[
    Validators.required,
    Validators.pattern("[A-Z a-z 0-9 .'-]+"),
    Validators.minLength(4),
    Validators.maxLength(20)
    ]),
    alert  : new FormControl(false,[
      ]),
    receiver  : new FormControl('',[
      ]),

    subject  : new FormControl('',[
    ]),
    content  : new FormControl('',[
      Validators.required,
      Validators.pattern("[A-Z a-z 0-9 .'-]+"),
    ]),
   }

    this.typeForm = this.fb.group(formControls);

  }
              get type_name() { return this.typeForm.get('type_name')}
              get alert() { return this.typeForm.get('alert')}
              get receiver() { return this.typeForm.get('receiver')}
              get subject() { return this.typeForm.get('subject')}
              get content() { return this.typeForm.get('content')}



          
  

  ngOnInit(): void {
    this.paperTypeSrvice.getPaperTypes().subscribe(
      res =>{ 
        this.paperTypes = res          
      }, err => {
        console.log(err);
        
      }
      
    )
  this.showMailForm = this.typeForm.get('alert').value 
    
  }




  addType()
  {
     let type = {
       paper_type : this.typeForm.get('type_name').value,
       is_renewing : this.typeForm.get('alert').value ? this.typeForm.get('alert').value : false
     }
     let email = {
      subject : this.typeForm.get('subject').value,
      content : this.typeForm.get('content').value
     }
    this.paperTypeSrvice.createType(type,email).subscribe(
      res => {
        this.toastr.success("Type added!")
        this.typeForm.reset()
        this.addTypeModal = false
        this.ngOnInit()
        
        }, err => {
          console.log(err);
          
        }
    )
    
 }


 openTypeModal()
 {
   this.addTypeModal = true
   this.typeForm.reset()   
  this.showMailForm = false
 }
 hideTheModal()
 {
   this.addTypeModal = false
   this.updateTypeModal = false
   this.typeForm.reset()   
 }


 getSelectedType(type)
 {


  this.selectedType = type 
   this.typeForm.patchValue({
     type_name : type.paper_type,
     alert : type.is_renewing,
     subject : type.email ? type.email.subject : "" ,
     content : type.email ? type.email.content  : "",
   })
   this.showMailForm = type.is_renewing
  this.updateTypeModal = true

 }

 isRenewing(event)
  {
    if(event.target.checked)
    {
      this.showMailForm = true
      
    } else {
      this.showMailForm = false

      
    }
  }
 
  updateType()
    {
      let type = {
        paper_type : this.typeForm.get('type_name').value,
        is_renewing : this.typeForm.get('alert').value,
        id : this.selectedType.id
      }
      let email = {
       subject : this.typeForm.get('subject').value,
       content : this.typeForm.get('content').value
      }
      
    this.paperTypeSrvice.updateType(type,email).subscribe(
      res => {
        console.log(res);
        this.toastr.success("updated")
        this.updateTypeModal = false
        this.typeForm.reset()
        this.showMailForm = false
        this.ngOnInit()
        
      }, err => {
        console.log(err);
        
      }
    )
      
    }

    deleteType(){
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this imaginary file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!', 
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          let types_id = []
          this.selectedTypes.map(el=>{
            types_id.push({
             "type_id": el.id
           })
          })
    
          this.paperTypeSrvice.deleteType(types_id).subscribe(
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

}
