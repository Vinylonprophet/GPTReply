import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ChatGptSerivce {

  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = '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';

  constructor(private http: HttpClient) { }

  generateText(messages: Array<any>): Observable<any> {
    const body = {
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.5,
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.chatGptApiKey}`
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}