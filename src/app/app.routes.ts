import { Routes } from '@angular/router';

import { AppLayoutComponent } from './layout/app.layout.component';
import { DashboardComponent } from './core/components/pages/dashboard/dashboard.component';
import { AuthComponent } from './core/components/auth/auth.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './core/components/auth/register/register.component';
import { IndexNivelComponent } from './core/components/pages/nivel/index/index-nivel/index-nivel.component';
import { IndexLeccionComponent } from './core/components/pages/leccion/index-leccion/index-leccion.component';
import { CreateLeccionComponent } from './core/components/pages/leccion/create-leccion/create-leccion.component';
import { PlanesComponent } from './core/components/pages/planes/planes.component';
import { PreguntaExamenComponent } from './core/components/pages/pregunta-examen/pregunta-examen.component';
import { ExamenInicialComponent } from './core/components/pages/examen-inicial/examen-inicial.component';
import { EjercicioLeccionComponent } from './core/components/pages/ejercicio-leccion/ejercicio-leccion.component';
import { EstudianteNivelComponent } from './core/components/pages/estudiante-nivel/estudiante-nivel.component';
import { LeccionNivelComponent } from './core/components/pages/leccion-nivel/leccion-nivel.component';
import { LeccionRetroalimentacionComponent } from './core/components/pages/leccion-retroalimentacion/leccion-retroalimentacion.component';

export const routes: Routes = [

    {
        path:'',
        component:AppLayoutComponent,canActivate:[AuthGuard],
        children:[
            {
                path:'dashboard',
                component:EstudianteNivelComponent,
                canActivate:[AuthGuard]
            },
            
            {
                path:'nivel',
                component:IndexNivelComponent,
                canActivate:[AuthGuard]
            },
            {
                path:'leccion',
                component:IndexLeccionComponent,
                canActivate:[AuthGuard]
            },
            {
                path:'leccion/create',
                component:CreateLeccionComponent,
                canActivate:[AuthGuard]
            },
            {
                path:'resolver_ejercicio/:id',
                component:EjercicioLeccionComponent,
                canActivate:[AuthGuard]
            },
            {
                path:'examen-inicial',
                component:ExamenInicialComponent,
                canActivate:[AuthGuard]
            },
            {
                path:'nivel-estudiante',
                component:EstudianteNivelComponent,
                canActivate:[AuthGuard]
            },
            {
                path:'nivel/:id/leccion',
                component:LeccionNivelComponent,
                canActivate:[AuthGuard]
            },
            {
                path:'leccion_retroalimentacion/:leccion',
                component:LeccionRetroalimentacionComponent,
                canActivate:[AuthGuard]
            }
           
            


        ]
    },
    {
        path:'login',
        component:AuthComponent

    },
    {
        path:'registrar',
        component:RegisterComponent
    },
    {
        path:'planes',
        component:PlanesComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'pregunta_examen',
        component:PreguntaExamenComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'examen_inicial',
        component:ExamenInicialComponent,
        canActivate:[AuthGuard]
    },
    




];
