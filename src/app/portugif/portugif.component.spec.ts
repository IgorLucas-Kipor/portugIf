import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortugifComponent } from './portugif.component';

describe('PortugifComponent', () => {
  let component: PortugifComponent;
  let fixture: ComponentFixture<PortugifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortugifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortugifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
