import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(valueList: any[], filters: any) {
    const keys = Object.keys(filters).filter(key => filters[key]);
    const subjectFilter = (subject: { [x: string]: any; }) => keys.every(key => subject[key].toLowerCase().includes(filters[key].toLowerCase()));
    return keys.length ? valueList.filter(subjectFilter) : valueList;
  }

}
