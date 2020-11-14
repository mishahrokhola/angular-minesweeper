import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweeperFieldComponent } from './minesweeper-field.component';

describe('MinesweeperFieldComponent', () => {
  let component: MinesweeperFieldComponent;
  let fixture: ComponentFixture<MinesweeperFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinesweeperFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinesweeperFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
