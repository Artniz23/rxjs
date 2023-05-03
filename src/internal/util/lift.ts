import { Observable } from '../Observable';
import { Subscriber } from '../Subscriber';
import { OperatorFunction } from '../types';
import { source } from '@angular-devkit/schematics';

/**
 * Creates an `OperatorFunction`. Used to define operators throughout the library in a concise way.
 * @param init The logic to connect the liftedSource to the subscriber at the moment of subscription.
 */
export function operate<T, R>(
  init: (liftedSource: Observable<T>, subscriber: Subscriber<R>) => (() => void) | void
): OperatorFunction<T, R> {
  return (source: Observable<T>) => {
    console.log('source lift', source);
    return new Observable((subscriber) => {
      const initel = init(source, subscriber);

      return initel;
    });
  };
}
