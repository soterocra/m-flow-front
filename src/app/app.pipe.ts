import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'getContactName'})
export class NameTransformPipe implements PipeTransform {
  
  transform(contact: any) {
    const name = () => {
      if (contact.preferredName != "") return contact.preferredName;
      if (contact.name != "") return contact.name;
      if (contact.userName != "") return contact.userName;
      return contact.userId;
    }
    return name();
  }

}