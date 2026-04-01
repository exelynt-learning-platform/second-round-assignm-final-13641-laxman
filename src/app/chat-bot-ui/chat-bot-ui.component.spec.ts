import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotUIComponent } from './chat-bot-ui.component';

describe('ChatBotUIComponent', () => {
  let component: ChatBotUIComponent;
  let fixture: ComponentFixture<ChatBotUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBotUIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBotUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
