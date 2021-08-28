import { Injectable } from '@angular/core';

const TOKEN = 'TOKEN';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.setItem(TOKEN, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN);
  }


}
