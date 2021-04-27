import { Component, Input, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  keyWorld
  searchResult
  clients = []
  projects = []
  contacts  = []
  result = 1
 
  constructor(private router :Router ,private route :ActivatedRoute , private userService : UserService) { }

  async ngOnInit() {
    this.keyWorld = this.route.snapshot.params.keyWorld ; 
    await this.userService.search(this.keyWorld).then(
      res => {
        this.searchResult = res
        this.clients  = res.clients
        this.projects = res.projects
        this.contacts = res.contacts


      }   , err =>{
        console.log(err);
        
      }
    )
  this.result = this.clients.length + this.projects.length + this.contacts.length
 
  console.log(this.searchResult);
  
    

  }


}
