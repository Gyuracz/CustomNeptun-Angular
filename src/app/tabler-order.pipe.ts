import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablerOrder'
})
export class TablerOrderPipe implements PipeTransform {

  transform(value: any, sort: any) {
    return value.sort((v1: { [x: string]: number; }, v2: { [x: string]: number; }) => {
      if(v1[sort.column] > v2[sort.column]){
        if(sort.direction == "asc"){
          return 1;
        }
        if(sort.direction == "desc"){
          return -1;
        }
      }
      if(v1[sort.column] < v2[sort.column]){
        if(sort.direction == "asc"){
          return -1;
        }
        if(sort.direction == "desc"){
          return 1;
        }
      }
      return 0;
    });
  }

}
