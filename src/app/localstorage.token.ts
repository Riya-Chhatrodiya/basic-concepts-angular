import { InjectionToken } from "@angular/core";

export const localStorageToken = new InjectionToken<any>('local storage',{
    providedIn: 'root',
    factory() {
        return localStorage; // or sessionStorage or window.location etc....
    }
})