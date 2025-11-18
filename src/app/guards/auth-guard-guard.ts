import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const valueID = localStorage.getItem('ValueID');
  const localData = valueID ? JSON.parse(valueID) : null;
  const router = inject(Router);

  if (localData?.localId) {
    router.createUrlTree(['/dashboard']);
    return true;
  } else {
    console.warn('Access denied. Redirecting to login.');
    return router.createUrlTree(['/login']);
  }
};

export const unauthGuard: CanActivateFn = (route, state) => {
  const valueID = localStorage.getItem('ValueID');
  const localData = valueID ? JSON.parse(valueID) : null;
  const router = inject(Router);

  if (localData && localData.localId) {
    console.warn('User is already logged in. Redirecting to dashboard.');
    return router.createUrlTree(['/dashboard']);
  } else {
    return true;
  }
};
