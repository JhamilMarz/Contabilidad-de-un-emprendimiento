import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlIngresoGastoComponent } from './control-ingreso-gasto.component';

describe('ControlIngresoGastoComponent', () => {
  let component: ControlIngresoGastoComponent;
  let fixture: ComponentFixture<ControlIngresoGastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlIngresoGastoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlIngresoGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
