import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  return localStorage.getItem('userData') ? true : router.parseUrl('/login'); // Returns a UrlTree
};

export const LogGuard: CanActivateFn = () => {
  const router = inject(Router);
  return !localStorage.getItem('userData')
    ? true
    : router.parseUrl('/dashboard');
};
