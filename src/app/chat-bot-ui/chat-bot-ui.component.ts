// import { Component } from '@angular/core';
// import { environment } from '../../environment/environment';
// import {GoogleGenAI} from '@google/genai';
// import { AsyncPipe, CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms'; 

// @Component({
//   selector: 'app-chat-bot-ui',
//   imports: [CommonModule, FormsModule,AsyncPipe],
//   templateUrl: './chat-bot-ui.component.html',
//   styleUrl: './chat-bot-ui.component.css',
//   standalone:true
// })
// export class ChatBotUIComponent {
// a:string="";
// aiResponse:string=""
// userInputForGo:string=''
// userInput:string="";
// isLoading:boolean=false;
// chatHistory: { text: string; sender: 'user' | 'ai' }[] = [];

//   ngOnInit() {
//     this.a=environment.apiUrl;
//     console.log('API URL:', this.a); // ✅ prints apiUrl
//   }
  
//  async submitUserMsg() {
//   const userMsg = this.userInputForGo;

//   if (!userMsg.trim()) return;

//   this.chatHistory.push({
//     text: userMsg,
//     sender: 'user'
//   });

//   this.userInputForGo = '';
//   this.isLoading = true;

//   const ai = new GoogleGenAI({
//     apiKey: environment.GeminiApiKey
//   });

//   try {
//     const timeout = new Promise((_, reject) =>
//       setTimeout(() => reject(new Error("Request timed out")), 15000)
//     );

//     const response: any = await Promise.race([
//       ai.models.generateContent({
//         model: 'gemini-2.5-flash',
//         contents: userMsg,
//       }),
//       timeout
//     ]);

//        // model: 'gemini-2.5-flash',
//     // model: 'gemini-3.1-flash-lite-preview',

//     const aiText = response?.text || "No response";

//     const cleanText = aiText.replace(/\*\*(.*?)\*\*/g, '$1');

//     this.chatHistory.push({
//       text: cleanText,
//       sender: 'ai'
//     });

//   } catch (error) {
//     this.isLoading=false
//     console.error("Error:", error);

//   alert("Request time out")

//   } finally {
//     this.isLoading = false;
//   }
// }


// }


import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// 1. Import your NgRx elements
import { ChatActions } from '../storeMsg/chat.actions';
import { selectAllMessages, selectIsLoading, selectChatError } from '../storeMsg/chat.selectors';

@Component({
  selector: 'app-chat-bot-ui',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: './chat-bot-ui.component.html',
  styleUrl: './chat-bot-ui.component.css'
})
export class ChatBotUIComponent implements OnInit {
  
  private store = inject(Store);
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  messages$ = this.store.select(selectAllMessages);
  isLoading$ = this.store.select(selectIsLoading);
  error$ = this.store.select(selectChatError);

  userInputForGo: string = '';

  ngOnInit() {
    
  }
ngAfterViewChecked() {        
      this.scrollToBottom();        
  }

  scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
  }
  
  submitUserMsg() {
    const userMsg = this.userInputForGo.trim();
    if (!userMsg) return;
    this.store.dispatch(ChatActions.sendMessage({ message: userMsg }));
    this.userInputForGo = '';
  }

}
