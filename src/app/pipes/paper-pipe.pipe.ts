import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paperPipe'
})
export class PaperPipePipe implements PipeTransform {

  transform(papers , searchKey): [] {
    if(!papers || !searchKey)
    {
      return papers
    }
    return papers.filter( paper => 
      paper.paper_name.toLowerCase().includes(searchKey.toLowerCase()) 
      )
  }

}
