import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectPipe'
})
export class ProjectPipePipe implements PipeTransform {

  transform(projects , searchKey): [] {
    if(!projects || !searchKey)
    {
      return projects
    }
    return projects.filter( project => 
      project.project_name.toLowerCase().includes(searchKey.toLowerCase())
      )
  }
  }


