import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Recuperarlo por una solicitud,
        // su siguiente que pasa a interceptar

        // Ingresa antes de que se envie la respuesta para subscribirse
        // Durante el flujo lanzar función de next para dejar de continuar

        console.log('Request is on its way');


        return next.handle(req);

        // -- cada vez que una solicitudabadonde la aplicación
    }
}