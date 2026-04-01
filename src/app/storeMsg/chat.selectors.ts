import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatState } from './chat.reducer';

// get the entire chat  from the store
export const selectChatState = createFeatureSelector<ChatState>('chat');

// select just the messages array
export const selectAllMessages = createSelector(
  selectChatState,
  (state: ChatState) => state.messages
);

// select the loading status
export const selectIsLoading = createSelector(
  selectChatState,
  (state: ChatState) => state.loading
);

// select the error message
export const selectChatError = createSelector(
  selectChatState,
  (state: ChatState) => state.error
);