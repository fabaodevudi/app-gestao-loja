import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { SubmitFlagFormComponent } from './submit-flag-form/submit-flag-form.component';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { StarterComponent } from './starter/starter.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { GerirLojaComponent } from './gerir-loja/gerir-loja.component';
export const Approutes: Routes = [
  { path: 'app-login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'app-home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'app-admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'app-starter', component: StarterComponent, canActivate: [AuthGuard]},
  { path: 'app-cadastrar-usuario', component: CadastrarUsuarioComponent},
  { path: 'app-editar-usuario', component: EditarUsuarioComponent, canActivate: [AuthGuard]},
  { path: 'app-gerir-loja', component: GerirLojaComponent, canActivate: [AuthGuard]},

  {
    path: '**',
    redirectTo: '/login'
  },

];
@NgModule({
  imports: [RouterModule.forRoot(Approutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}









