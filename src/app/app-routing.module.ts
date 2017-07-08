import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NowPage } from './pages/now/now.page';
import { EodPage } from './pages/eod/eod.page';
import { SettingsPage } from './pages/settings/settings.page';

export const routes: Routes = [
  { path: 'now', component: NowPage },
  { path: 'eod', component: EodPage },
  { path: 'settings', component: SettingsPage },
  { path: '', redirectTo: 'now', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
