import { TestBed } from '@angular/core/testing';

import { ChatbotMstProjectService } from './chatbot-mst-project.service';

describe('ChatbotMstProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatbotMstProjectService = TestBed.get(ChatbotMstProjectService);
    expect(service).toBeTruthy();
  });
});
