import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import {UserService} from "./services/user.service";



export const usersGuard: CanActivateFn = (route, state) => {
  if (inject(UserService).isAuthenticated()) {
    return true;
  }else{
    inject(Router).navigate(['/login'])
    return false
  }
};



export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (userService.isAdmin()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

