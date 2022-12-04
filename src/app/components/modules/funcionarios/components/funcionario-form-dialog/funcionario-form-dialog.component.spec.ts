import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioFormDialogComponent } from './funcionario-form-dialog.component';

describe('FuncionarioFormDialogComponent', () => {
    let component: FuncionarioFormDialogComponent;
    let fixture: ComponentFixture<FuncionarioFormDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FuncionarioFormDialogComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FuncionarioFormDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
