import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {
    public apiUrl = 'http://localhost/covid-slayer';
}