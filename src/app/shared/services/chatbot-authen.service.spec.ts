import { TestBed } from '@angular/core/testing';

import { ChatbotAuthenService } from './chatbot-authen.service';

describe('ChatbotAuthenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatbotAuthenService = TestBed.get(ChatbotAuthenService);
    expect(service).toBeTruthy();
  });
});
