import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'getContactNameInitials'})
export class InitialsNameTransformPipe implements PipeTransform {
  
  transform(name: string) {
    const initials = () => {   
      name = name || '';
      let nameList = name.split(' ');
      if (nameList.length > 1)
        return nameList[0].substring(0, 1) + nameList[1].substring(0, 1);
      else
        return nameList[0].substring(0, 1)
    }
    return initials();
  }

}