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
    path: 'newreport',
    loadChildren: () => import('./pages/newreport/newreport.module').then( m => m.NewreportPageModule)
  },
  {
    path: 'report/:idReport',
    loadChildren: () => import('./modal/report/report.module').then( m => m.ReportPageModule)
  },
  {
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
  },
  {
    path: 'tab5',
    loadChildren: () => import('./pages/tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'list-admin',
    loadChildren: () => import('./pages/list-admin/list-admin.module').then( m => m.ListAdminPageModule)
  },
  {
    path: 'list-editor',
    loadChildren: () => import('./pages/list-editor/list-editor.module').then( m => m.ListEditorPageModule)
  },
  {
    path: 'search-user',
    loadChildren: () => import('./modal/search-user/search-user.module').then( m => m.SearchUserPageModule)
  },
  {
    path: 'type-reports',
    loadChildren: () => import('./pages/type-reports/type-reports.module').then( m => m.TypeReportsPageModule)
  }






];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
