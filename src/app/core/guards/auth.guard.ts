import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {
    const token = localStorage.getItem('token');
    const router = inject(Router);
  
    if ((route.routeConfig?.path === 'signup' || route.routeConfig?.path === 'login') && token) {
      router.navigate(['/inicio']);
      return false;
    }

    if (token) {
      return true;
    }
  
    router.navigate(['/login']);
    return false;
};