import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/components/login/login.component';
import { SignupComponent } from './features/signup/components/signup/signup.component';
import { CrudEntidadComponent } from './features/entidades/components/crud-entidad/crud-entidad.component';
import { CrudTipoDocumentoComponent } from './features/tipo-documento/components/crud-tipo-documento/crud-tipo-documento.component';
import { CrudTipoContribuyenteComponent } from './features/tipo-contribuyente/components/crud-tipo-contribuyente/crud-tipo-contribuyente.component';
import { InicioComponent } from './features/inicio/components/inicio/inicio.component';
import { AuthenticatedLayoutComponent } from './shared/components/authenticated-layout/authenticated-layout.component';
import { UnauthenticatedLayoutComponent } from './shared/components/unauthenticated-layout/unauthenticated-layout.component';
import { loggedGuard } from './core/guards/logged.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: UnauthenticatedLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent, canActivate: [loggedGuard] },
            { path: 'signup', component: SignupComponent, canActivate: [loggedGuard] },
            { path: '', redirectTo: '/login', pathMatch: 'full' },
        ]
    },
    {
        path: '',
        component: AuthenticatedLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: 'inicio', component: InicioComponent },
            { path: 'entidad', component: CrudEntidadComponent },
            { path: 'tipo-documento', component: CrudTipoDocumentoComponent },
            { path: 'tipo-contribuyente', component: CrudTipoContribuyenteComponent },
 
        ]
    },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
