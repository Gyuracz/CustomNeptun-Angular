import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(valueList: any[], filters: any) {
    const keys = Object.keys(filters).filter(key => filters[key]);
    const tableFilter = (row: { [x: string]: any; }) => keys.every(key => (row[key] + "").toLowerCase().includes((filters[key] + "").toLowerCase()));
    return keys.length ? valueList.filter(tableFilter) : valueList;
  }

}
