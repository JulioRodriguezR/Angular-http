import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';

import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        /*
            Recuperarlo por una solicitud,
            su siguiente pasa a interceptar

            Ingresa antes del envío de respuesta para subscribirse.
            Durante el flujo lanzar función de next para dejar de continuar
        */

        console.log('Request is on its way');
        const modifieReq = req.clone({
            headers: req.headers.append('Auth', 'azx')
        });

        // Cambio y reeenvio de la solicitud modificada
        // Interactuar con la respuesta
        return next.handle(modifieReq).pipe(
            tap(ev => {
                console.log(ev);
                if (ev.type === HttpEventType.Response) {
                    console.log('Body data...');
                    console.log(ev.body);
                }
            })
        );
    }
}
