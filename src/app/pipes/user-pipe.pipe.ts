import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userPipe'
})
export class UserPipePipe implements PipeTransform {

  transform(users , searchKey): [] {
    if(!users || !searchKey)
    {
      return users
    }
    return users.filter( user => 
      user.name.toLowerCase().includes(searchKey.toLowerCase()) ||
      user.email.toLowerCase().includes(searchKey.toLowerCase()) 
      )
  }
}
