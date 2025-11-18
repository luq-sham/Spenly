import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  getUserData() {
    const valueID = localStorage.getItem('ValueID');
    const localData = valueID ? JSON.parse(valueID) : null;
    return {
      ...localData,
    }
  }
}
