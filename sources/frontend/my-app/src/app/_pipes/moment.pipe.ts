import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime'; 

@Pipe({
  name: 'dateFromNow'
})
export class FromNowPipe implements PipeTransform {

  transform(value: string): unknown {
    dayjs.extend(relativeTime);
    return dayjs(value!).fromNow();
  }

}
