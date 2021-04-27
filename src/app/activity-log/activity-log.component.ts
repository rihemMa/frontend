import { Component, OnInit } from '@angular/core';
import { ActivityLogService } from '../services/activity-log.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
users
selectedUser = "*"
activities
allActivities
  constructor(private userService : UserService , private activityLogService : ActivityLogService) { }

  ngOnInit(): void {
    this.userService.getusers().subscribe(
      res => {
        this.users =  res
        
      }, err => {
        console.log(err);
        
      }
    )

    this.activityLogService.getAllactivities().subscribe(
      res => {
        console.log(res);
        this.allActivities = res
        this.activities = res 

        
      } , err => {
        console.log(err);
        
      }
    )
  }



  filter(event)
  {


    if(this.selectedUser == "*")
    {
    this.activities = this.allActivities
    console.log(this.activities);
    
      
    }else {
     this.activityLogService.getUserActivities(this.selectedUser).subscribe(
       res => {
       this.activities = res 
          }, err => {

       }
     )
    
      
    }
    
  }


  findService(service_id,space_name)
  {
    
  }

}
