import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    public apiUrl = 'http://localhost/covid-slayer';
    constructor(private http: HttpClient) { }

    getUser() {
        return this.http.get<User[]>(`${this.apiUrl}/users/getUser.json`);
    }

    register(user: User) {
        return this.http.post(`${this.apiUrl}/users/register.json`, user);
    }
}