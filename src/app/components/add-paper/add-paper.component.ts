import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PaperTypeService } from 'src/app/services/paper-type.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';
import { ConfigService } from 'src/app/services/config.service';


@Component({
  selector: 'app-add-paper',
  templateUrl: './add-paper.component.html',
  styleUrls: ['./add-paper.component.css']
})
export class AddPaperComponent implements OnInit {

  @Input() addNewPaperModal
  @Input() projectId
  @Output() updatePage: EventEmitter<any> = new EventEmitter()
  @Output() hideModal: EventEmitter<any> = new EventEmitter()
  paperForm: FormGroup
  papersType
  projects
  status_paper
  files
  

  constructor(private fb: FormBuilder,
    private paperTypeService: PaperTypeService,
    private toastr: ToastrService,
    private projectService: ProjectService,
    private configService: ConfigService
  ) {
    let formControls = {

      paper_name: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Z a-z 0-9 .'-]+"),
        Validators.minLength(4),
        Validators.maxLength(16)
      ]),
      paper_type: new FormControl('', [
        Validators.required,

      ]),
      start_date: new FormControl('', [
        Validators.required,
      ]),
      end_date: new FormControl('', [
        Validators.required,
      ]),
      description: new FormControl('', [

      ]),

      project_id: new FormControl('', [
        Validators.required,
      ]),
      status: new FormControl('', [
        Validators.required,
      ]),
      file: new FormControl('', [
      ]),
      auto_email: new FormControl(false, [
      ])
    }
    this.paperForm = this.fb.group(formControls);
  }
  get paper_name() { return this.paperForm.get('paper_name') }
  get paper_type() { return this.paperForm.get('paper_type') }
  get start_date() { return this.paperForm.get('start_date') }
  get end_date() { return this.paperForm.get('end_date') }
  get description() { return this.paperForm.get('description') }
  get project_id() { return this.paperForm.get('project_id') }
  get status() { return this.paperForm.get('status') }
  get file() { return this.paperForm.get('file') }
  get auto_email() { return this.paperForm.get('auto_email') }
  ngOnInit(): void {
    this.paperTypeService.getPaperTypes().subscribe(
      res => {
        this.papersType = res
      }, err => {
        console.log(err)
      }
    )
    this.projectService.getProjectsWithinfo().subscribe(
      res => {
        this.projects = res
      }, err => {
        console.log(err)
      }
    )
    this.status_paper = this.configService.status_paper


    this.paperForm.patchValue({
       project_id : this.projectId
    })

  }

  hideTheModal() {
    this.paperForm.reset()
    this.hideModal.emit()
  }




  addPaper() {

   
    let paper = (this.paperForm.value)
    let start_date =  new Date(paper.start_date).getTime()
    let end_date = new Date(paper.end_date).getTime()
    let diff = (end_date - start_date )/86400000
    if( diff < 31 )
    {
     this.toastr.error("End date must be Bigger than Start date at least 31 days")
    }else{
    let formData = new FormData();
      formData.append("file",this.files,this.files.name)
      this.paperTypeService.uploadFile(formData).then(
        res => {
      this.paperTypeService.createPaper(paper,res.path).subscribe(
        res=>{
          this.toastr.success("Paper added!")
          this.updatePage.emit()
          this.paperForm.reset()
          },err=>{
          console.log(err)}
      )
        },err => {
            console.log(err)
          }) 
      
    }

  
}

  selectFile(event) {
    this.files = event.target.files[0]

  }



}
