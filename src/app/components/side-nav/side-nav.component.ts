import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  filterRoutes(space_name)
{
  let privileges = JSON.parse(localStorage.getItem('privileges'))
  let user = JSON.parse(localStorage.getItem('user'))
  let role_id = user.role_id 
  let  reslt  = privileges.find(element =>{
    let name = element.space.space_name
    let i = space_name.indexOf(name)
    if(i != -1)
    {
      
      return element.space
    }    
   });
 if(reslt || role_id == 1)
   {
    return true
   }else{
     return false 
   }
}
}
