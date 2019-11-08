import {Observable} from 'rxjs';
import {IPhoto} from '../models/issue';

export function tableAnimation(source)  {
  return new Observable((observer) => {
    const ani = {
      next: (val) => {
        // let newValue: IPhoto[] = val;
        return observer.next(val)
      },
      error: (err) => observer.error(err),
      complete: () => observer.complete()
    };
    return source.subscribe(ani)
  })

}
