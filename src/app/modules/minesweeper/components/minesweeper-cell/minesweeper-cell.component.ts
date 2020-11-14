import { Component, Input, Output, HostListener, OnInit, EventEmitter } from '@angular/core';
import { CellType } from '../../enums/cell-type.enum';
import { Cell } from '../../entities/cell.class';

@Component({
	selector: 'minesweeper-cell',
	templateUrl: './minesweeper-cell.component.html',
	styleUrls: ['./minesweeper-cell.component.scss'],
})
export class MinesweeperCellComponent implements OnInit {
	@Input() public readonly game!: readonly Cell[][];
	@Input() public readonly cell!: Cell;

	@Output() public mineClick = new EventEmitter();
	@Output() public cellOpen = new EventEmitter<Cell>();

	constructor() {}

	public ngOnInit(): void {}

	@HostListener('contextmenu', ['$event']) private handleContextMenu(event: MouseEvent) {
		event.preventDefault();
		this.handleRightClick();
	}

	@HostListener('click', ['$event']) private handleClick(event: MouseEvent) {
		event.preventDefault();

		if (event.button === 2) {
			return this.handleRightClick();
		}

		return this.handleLeftClick();
	}

	private handleLeftClick(): void {
		if (this.cell.isFlagged) {
			return;
		}

		if (this.cell.type === CellType.mine) {
			this.mineClick.emit();
			return;
		}

		if (!this.cell.isOpen) {
			this.cellOpen.emit(this.cell);
		}
	}

	private handleRightClick(): void {
		if (!this.cell.isOpen) {
			this.cell.isFlagged = !this.cell.isFlagged;
		}
	}

	public getCellClass(): string {
		if (this.cell.isOpen) {
			return `${this.getFlagClass()} cell--${this.cell.nearMinesCount}`;
		}

		return this.getFlagClass();
	}

	private getFlagClass(): string {
		if (this.cell.isFlagged) {
			return 'flag';
		}

		return '';
	}
}
