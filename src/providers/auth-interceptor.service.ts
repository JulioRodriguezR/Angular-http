import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';


export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        /*
            Recuperarlo por una solicitud,
            su siguiente pasa a interceptar

            Ingresa antes del envío de respuesta para subscribirse.
            Durante el flujo lanzar función de next para dejar de continuar
        */

        const modifieReq = req.clone({
            headers: req.headers.append('Auth', 'azx')
        });

        // Cambio y reeenvio de la solicitud modificada
        // Interactuar con la respuesta
        return next.handle(modifieReq);
    }
}
