import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rolePipe'
})
export class RolePipePipe implements PipeTransform {

  transform(roles , searchKey): [] {
    if(!roles || !searchKey)
    {
      return roles
    }
    return roles.filter( role => 
      role.role_name.toLowerCase().includes(searchKey.toLowerCase()) 
      )
  }

}
