import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { PaperTypeService } from '../services/paper-type.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  text: string = '<h1>bonjour</h2>';

      emailEditModal
      moreInfoModal
      previewModal
      contractsModal

      selectedContractsType
      contracts = new Array()
      contract_status
      paper_status
      selectedContracts
      response
      maintContracts
      hostingtContracts
      updateContracts
   

    

  constructor(private paperTypeService:PaperTypeService,private configService:ConfigService) { }

  async ngOnInit() {
 await  this.paperTypeService.getJustContracts().then(
    res => {
      this.response = res                  
        this.contracts = this.response.contracts
        
        this.maintContracts = this.response.maintenance
        this.hostingtContracts = this.response.hosting
        this.updateContracts =  this.response.update
      }, err => {
      console.log(err)
    }
  )   

  await this.sendMail()
    this.contract_status= this.configService.contract_status
    this.paper_status= this.configService.status_paper
    

  }







  showcContracts(selectedContracts)
{
  this.contractsModal = true
  this.selectedContractsType = selectedContracts
}



filterStatus(id)
{
  let status =  this.paper_status.find( el => el.id == id )
  return status
}
filterStatus1(id)
{
  if(id == 0){
    return this.contract_status['1']
  }else {
    return this.contract_status['0']
  }
}



showEmail()
{
  this.emailEditModal = true
}

ShowContract(contract)
{
  this.moreInfoModal = true
}
preview()
{
  this.previewModal = true
}




sendMail()
  {

    let autoContracts = new Array() 
    
    this.contracts.forEach(element => {
        if((element.auto_email == 1 ) && (element.isReminded == 0)){
          autoContracts.push(element)
        }
    })    
if(autoContracts.length != 0)
    {
         this.paperTypeService.sendMail(autoContracts).then(
       res => {
         console.log(res);                  
       }, err => {
         console.log(err);
         
       })
      

    }    
  }




  dashboardAccess()
  {
    let user = JSON.parse(localStorage.getItem('user'))
    let role_id = user.role_id 
    if(role_id == 1)
    {
      return true
    }else {
      return false
    }
  }

}
