import { BaseUrlInterceptor } from './interceptors/base-url-interceptor';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { environment } from '../environments/environment';
import { UsuarioService } from './services/usuario.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PersonaService } from './services/persona.service';
import { FormularioService } from './services/formulario.service';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        { provide: 'BASE_API_URL', useValue: environment.backUrl },
        // httpClient interceptors
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BaseUrlInterceptor,
            multi: true,
        },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, // demo
        CustomerService, // demo
        EventService, // demo
        IconService, // demo
        NodeService, // demo
        PhotoService, // demo
        ProductService, // demo
        // mis servicios
        UsuarioService,
        PersonaService,
        FormularioService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
