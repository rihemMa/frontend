import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quote'
})
export class QuotePipe implements PipeTransform {

  transform(bills , searchKey): [] {
    if(!bills || !searchKey)
    {
      return bills
    }
    return bills.filter( bill =>
      bill.billNum.toLowerCase().includes(searchKey.toLowerCase()) ||
      bill.client.client_name.toLowerCase().includes(searchKey.toLowerCase())

      )
  }

}
