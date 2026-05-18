import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StreamService {
  constructor(private http: HttpClient) {}
  private backend = environment.apiUrl;
  getVideo(url: string) {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.backend}/stream?url=${url}`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
