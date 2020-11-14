import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinesweeperCellComponent } from './components/minesweeper-cell/minesweeper-cell.component';
import { MinesweeperFieldComponent } from './components/minesweeper-field/minesweeper-field.component';

@NgModule({
	declarations: [MinesweeperFieldComponent, MinesweeperCellComponent],
	imports: [CommonModule],
	exports: [MinesweeperFieldComponent],
})
export class MinesweeperModule {}
