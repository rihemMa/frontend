import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import { ConfigService } from 'src/app/services/config.service';
import { PaperTypeService } from 'src/app/services/paper-type.service';
import { ProjectService } from 'src/app/services/project.service';
import { ToastrService } from 'ngx-toastr';
import { Api } from '../../api'
declare const $: any;

@Component({
  selector: 'app-update-paper',
  templateUrl: './update-paper.component.html',
  styleUrls: ['./update-paper.component.css']
})
export class UpdatePaperComponent implements OnInit {

  @Input() updatePaperModal 
  @Input() selectedPaper
  @Output() hideModal: EventEmitter<any> = new EventEmitter()
  @Output() refreshPage: EventEmitter<any> = new EventEmitter()

  selectedPaperId
  selectedFilePath
  paperForm : FormGroup
  projects 
  papersType
  status_paper
  files
  api = new Api 
  fileGenralLink = this.api.url

  constructor(private fb:FormBuilder, 
    private toastr :ToastrService,
    private projectService :ProjectService,
    private configService:ConfigService,
    private paperTypeService:PaperTypeService) { 




      let formControls = {
                
              paper_name : new FormControl('',[
              Validators.required,
              Validators.pattern("[A-Z a-z 0-9 .'-]+"),
              Validators.minLength(4),
              Validators.maxLength(16)
              ]),
              paper_type : new FormControl('',[
              Validators.required,

                  ]),
              start_date : new FormControl('',[
              Validators.required,
                        ]), 
              end_date : new FormControl('',[
              Validators.required,
                      ]),  
              description : new FormControl('',[

                ]), 
                
              project_id : new FormControl('',[
                  Validators.required,
                      ]),   
              status : new FormControl('',[
                        Validators.required,
              ]),      
              file : new FormControl('',[
              ]), 
              auto_email : new FormControl('',[
                    ]),      
                      
          }
      this.paperForm = this.fb.group(formControls) ;
      }
            get paper_name() { return this.paperForm.get('paper_name') }
            get paper_type() { return this.paperForm.get('paper_type') }
            get start_date() { return this.paperForm.get('start_date')}
            get end_date() { return this.paperForm.get('end_date')}
            get description() { return this.paperForm.get('description')}
            get project_id() { return this.paperForm.get('project_id')}
            get status() { return this.paperForm.get('status')}
            get file() { return this.paperForm.get('file')}
            get auto_email() { return this.paperForm.get('auto_email')}
            
      ngOnInit():void {

                this.projectService.getProjectsWithinfo().subscribe(
                  res =>{
                  this.projects = res   
              }, err =>{
                    console.log(err)
                  }
                )

                this.paperTypeService.getPaperTypes().subscribe(
                  res=>{
                  this.papersType = res   
                  
                    }, err =>{
                    console.log(err)
                  }
                )

                this.status_paper= this.configService.status_paper
                this.paperForm.patchValue({
                  paper_name: this.selectedPaper.paper_name,
                  paper_type:  this.selectedPaper.paper_type.id ? this.selectedPaper.paper_type.id :this.selectedPaper.paper_type,
                  start_date : new Date(this.selectedPaper.start_date),
                  end_date : new Date(this.selectedPaper.end_date),
                  project_id : this.selectedPaper.project_id,
                  description : this.selectedPaper.description,
                  status : this.selectedPaper.status,
                  auto_email : this.selectedPaper.auto_email
                  })

                  this.selectedFilePath = this.selectedPaper.paper_file 
                  console.log(this.selectedPaper)

              }


              async updatePaper()
                {
                  let newPaper = this.paperForm.value
                  
                  let start_date =  new Date(newPaper.start_date).getTime()
                  let end_date = new Date(newPaper.end_date).getTime()
                  let diff = (end_date - start_date )/86400000
                  if( diff < 31 ){
                    this.toastr.error("End date must be Bigger than Start date at least 31 days")

                  }else{

                  this.selectedPaperId = this.selectedPaper.id  
                  let path=''
                  let formData = new FormData();
                  if(this.files){
                  (formData.append("file",this.files,this.files.name))
                  await this.paperTypeService.uploadFile(formData).then( 
                  res => {
                    path = res.path
                    console.log(path)
                    }, err => { console.log(err);})
                    
                  }
                                this.paperTypeService.updatePaper(this.selectedPaperId,newPaper,path).subscribe(
                                  res => {
                                this.toastr.success('Paper Updated!')
                                    this.updatePaperModal = false
                                    this.refreshPage.emit()
                                  }, err => {
                                    console.log(err)
                                  }
                                )
                          
                  }
                }

                  selectFile(event)
              {
                this.files = event.target.files[0]
                
              }

              hideTheModal() {
                this.paperForm.reset()
                this.hideModal.emit()
              }


}
