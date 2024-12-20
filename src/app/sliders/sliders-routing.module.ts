import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { ComunicadosComponent } from './pages/comunicados/comunicados.component';
import { InyeccionComponent } from './pages/inyeccion/inyeccion.component';
import { EnsambleComponent } from './pages/ensamble/ensamble.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'comunicados',
        component: ComunicadosComponent
      },
      {
        path: 'inyeccion',
        component: InyeccionComponent
      },
      {
        path: 'ensamble',
        component: EnsambleComponent
      },
      {
        path: '',
        redirectTo: 'comunicados',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlidersRoutingModule { }
