import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';

import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Outgoing request');
        console.log(req.url);
        console.log('Headers ' + req.headers); // ...auth-interceptor
        return next.handle(req).pipe(
            tap(ev => {
                console.log(ev);
                if (ev.type === HttpEventType.Response) {
                    console.log('Incoming response...');
                    console.log(ev.body);
                }
            })
        );
    }
}