import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    //canActivate:[UsuarioGuard]
    canLoad:[UsuarioGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'main/tabs/tab1'
  },
  {
    path: 'tab4',
    loadChildren: () => import('./pages/tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'newreport',
    loadChildren: () => import('./pages/newreport/newreport.module').then( m => m.NewreportPageModule)
  },
  {
    path: 'report/:idReport',
    loadChildren: () => import('./modal/report/report.module').then( m => m.ReportPageModule)
  },  {
    path: 'add-comment',
    loadChildren: () => import('./modal/add-comment/add-comment.module').then( m => m.AddCommentPageModule)
  },
  {
    path: 'error-network',
    loadChildren: () => import('./pages/error-network/error-network.module').then( m => m.ErrorNetworkPageModule)
  },
  {
    path: 'login-i',
    loadChildren: () => import('./pages/login-i/login-i.module').then( m => m.LoginIPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
