import { Component } from '@angular/core';
import { ChatGptSerivce } from './service/chat-gpt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GPTReply';
  message = '';
  conversation: any[] = [
    { role: 'system', content: 'As an adept assistant, you possess extensive expertise in Angular, RxJS, TypeScript, and various programming languages, honed through countless years of experience. Your remarkable comprehension of design principles, clean code, and testing methodologies enables you to provide invaluable guidance and support, making you an indispensable resource for developers everywhere.' }
  ];

  constructor(private chatGptService: ChatGptSerivce) {

  }

  generateText() {
    this.conversation.push({ role: 'user', content: 'hello, who a u?' });

    this.chatGptService.generateText(this.conversation).subscribe(response => {
      console.log("result: ", response);
    });
  }
}
