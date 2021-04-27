import { Component, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { PaperTypeService } from '../services/paper-type.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  
  constructor(private router:Router , private PaperTypeService :PaperTypeService) { }

  expiredContracts
 async ngOnInit() {
    let url = this.router.url
    let privileges = JSON.parse(localStorage.getItem('privileges'))
    let user = JSON.parse(localStorage.getItem('user'))
    let role_id = user.role_id 


         let  reslt  = privileges.find(element =>{
         let name = element.space.space_name
         let i = url.indexOf(name)
         if(i != -1)
         {
           return element.space
         }
         
        });


        if(role_id == 1 )
        {

        }else if(!reslt){
          this.router.navigate(['/dashboard'])

        }


   
   await  this.PaperTypeService.getExpiredContracts().then(
      res => {
        this.expiredContracts = res
      }, err => {
        console.log(err);
        
      }
    )
     this.PaperTypeService.changeStatus(this.expiredContracts,3).subscribe(
       res => {         
       }, err => {
         console.log(err);
         
       }
     )
     
    

   }
}
