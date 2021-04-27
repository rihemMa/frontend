import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientPipe'
})
export class ClientPipePipe implements PipeTransform {

  transform(clients , searchKey): [] {
    if(!clients || !searchKey)
    {
      return clients
    }
    return clients.filter( client => 
      client.client_name.toLowerCase().includes(searchKey.toLowerCase()) ||
      client.email.toLowerCase().includes(searchKey.toLowerCase()) 
      )
  }

}
