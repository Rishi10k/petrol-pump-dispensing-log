import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Entry } from './components/entry/entry';
import { Listing } from './components/listing/listing';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'listing', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'entry', component: Entry, canActivate: [authGuard] },
  { path: 'listing', component: Listing, canActivate: [authGuard] },
  { path: '**', redirectTo: 'listing' }
];