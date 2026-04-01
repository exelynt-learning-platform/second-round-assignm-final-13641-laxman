import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ChatActions } from './chat.actions';
import { catchError, map, switchMap, of, from } from 'rxjs'; // Added 'from'
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../environments/environment';

@Injectable()
export class ChatEffects {
  private actions$ = inject(Actions);

  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.sendMessage),
      switchMap((action) => {
        const genAI = new GoogleGenerativeAI(environment.GeminiApiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-3.1-flash-lite-preview',
        });

        return from(model.generateContent(action.message)).pipe(
          map((result: any) => {
            let text = result.response.text();

            text = text.replace(/###\s?/g, '');

            text = text.replace(/---/g, '');

            text = text.replace(/\*\*/g, '');

            return ChatActions.sendMessageSuccess({ response: text.trim() });
          }),
          catchError((err: { message: string }) =>
            of(
              ChatActions.sendMessageFailure({
                error: err.message || 'API Error',
              }),
            ),
          ),
        );
      }),
    ),
  );
}
