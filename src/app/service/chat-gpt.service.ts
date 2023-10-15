import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { RestClient } from './core-services/rest.client.service';
import { ChatResponse } from '../models/chat-response.model';
import { PrideController } from './controller/pride.controller.service';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private prideController: PrideController) { }

  chat(messages: Array<{ role: string; content: string }>): Observable<ChatResponse> {
    const body = {
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.5,
    };

    return this.prideController.post('gpt', 'chat', body);
  }
}