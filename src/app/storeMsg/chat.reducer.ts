import { createReducer, on } from '@ngrx/store';
import { ChatActions } from './chat.actions';

export interface ChatMessage {
  text: string;
  sender: 'user' | 'ai';
}

export interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
}


export const initialState: ChatState = {
    
  messages: [
    { text: 'Hello! How may I help you today?', sender: 'ai' } as ChatMessage
  ],
  loading: false,
  error: null,
};

export const chatReducer = createReducer(
  initialState,

  
  
  on(ChatActions.sendMessage, (state, { message }) => {
  console.log('2. Reducer: Adding message to state');
  return {
    ...state,
    loading: true,
    messages: [...state.messages, { text: message, sender: 'user' } as ChatMessage]
  };
}),

on(ChatActions.sendMessageSuccess, (state, { response }) => ({
  ...state,
  loading: false,
  messages: [...state.messages, { text: response, sender: 'ai' } as ChatMessage]
})), 

  on(ChatActions.sendMessageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  on(ChatActions.clearChat, () => initialState)
);