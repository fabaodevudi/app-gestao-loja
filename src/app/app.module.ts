import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SubmitFlagFormComponent } from './submit-flag-form/submit-flag-form.component';

import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { LoginComponent } from './login/login.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AuthGuardService } from './guards/auth.guard.service';
import { LoginWS } from 'src/providers/ws/login.ws';
import { AuthGuard } from './guards/auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './guards/jwt.interceptor';
import { EnvironmentService } from 'src/providers/environment/environment.service';
import { HomeComponent } from './home/home.component';
import { UiModule } from './ui/ui.module';
import { AdminComponent } from './admin/admin.component';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { StarterComponent } from './starter/starter.component';
import { UsuarioWS } from 'src/providers/ws/usuario.ws';

import { GerirLojaComponent } from './gerir-loja/gerir-loja.component';
import { LojaWS } from 'src/providers/ws/loja.ws';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
 
    SubmitFlagFormComponent,
    
    FieldErrorDisplayComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    CadastrarUsuarioComponent,
    EditarUsuarioComponent,
    StarterComponent,
    GerirLojaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SnotifyModule ,
    HttpClientModule,
    UiModule,
    FormsModule,
    ModalModule.forRoot(),
    
  ],
  providers: [SnotifyService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
     AuthGuardService,
     LoginWS,
     UsuarioWS,
     LojaWS,
     AuthGuard,
     HttpClientModule,
     EnvironmentService,
     BsModalService    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
