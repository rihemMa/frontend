import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { SearchResultComponent } from '../search-result/search-result.component';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  searchResult
    userName
    searchKey
    visibleSidebar1

  constructor( 
    private primengConfig: PrimeNGConfig,
                private toastr: ToastrService, 
                private router: Router,
                private userService : UserService ) { }

  ngOnInit(): void {

    this.primengConfig.ripple = true;
    let user = JSON.parse(localStorage.getItem('user'))
      this.userName = user.name
  }


  
  logout()
  {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('privileges')
      this.router.navigate(['/login'])
      this.toastr.info('you are logged out')

   }



 
}
