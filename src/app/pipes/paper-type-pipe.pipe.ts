import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paperTypePipe'
})
export class PaperTypePipePipe implements PipeTransform {

  transform(paperType , searchKey): [] {
    if(!paperType || !searchKey)
    {
      return paperType
    }
    return paperType.filter( type => 
      type.paper_type.toLowerCase().includes(searchKey.toLowerCase()) 
      )
  }

}
