import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSucursalComponent } from './select-sucursal.component';

describe('SelectSucursalComponent', () => {
  let component: SelectSucursalComponent;
  let fixture: ComponentFixture<SelectSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSucursalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
