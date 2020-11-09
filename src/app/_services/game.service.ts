import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GameService {
    public apiUrl = 'http://localhost/covid-slayer';
    constructor(private http: HttpClient) { }

    getActiveSession() {
        return this.http.get(`${this.apiUrl}/game/getActiveSession.json`);
    }

    start() {
        return this.http.post(`${this.apiUrl}/game/start.json`,{});
    }

    attack(by) {
        return this.http.post(`${this.apiUrl}/game/attack.json?by=${by}`,{});
    }
    
    heal(by) {
        return this.http.post(`${this.apiUrl}/game/heal.json?by=${by}`,{});
    }
    
    blast(by) {
        return this.http.post(`${this.apiUrl}/game/blast.json?by=${by}`,{});
    }

    giveUp() {
        return this.http.post(`${this.apiUrl}/game/giveUp.json`,{});
    }
}