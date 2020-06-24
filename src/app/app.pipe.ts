import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'getContactName'})
export class NameTransformPipe implements PipeTransform {
  
  transform(contact: any) {
    const name = () => {
      if (contact.userName != "") return contact.userName;
      return contact.userId;
    }

    let appropriateName: string = name();
    // if (appropriateName.length > 13)
    //   appropriateName = appropriateName.substring(0, 9).trim() + '...';
    
    return appropriateName;
  }

}