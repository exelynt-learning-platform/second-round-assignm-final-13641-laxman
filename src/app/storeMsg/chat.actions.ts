import { createActionGroup, props, emptyProps } from '@ngrx/store';

// We group these actions so they are easy to import elsewhere
export const ChatActions = createActionGroup({
  source: 'Chat Page', 
  events: {
    // when the user clicks send
    'Send Message': props<{ message: string }>(),

    //  When gemini gives us  answer
    'Send Message Success': props<{ response: string }>(),

    //  when something breaks 
    'Send Message Failure': props<{ error: string }>(),

    // To wipe the talk
    'Clear Chat': emptyProps(),
  }
});