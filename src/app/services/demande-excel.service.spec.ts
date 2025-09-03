import { TestBed } from '@angular/core/testing';

import { DemandeExcelService } from './demande-excel.service';

describe('DemandeExcelService', () => {
  let service: DemandeExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
