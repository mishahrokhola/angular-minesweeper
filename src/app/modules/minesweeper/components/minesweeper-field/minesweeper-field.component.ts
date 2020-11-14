import { Component, Input, OnInit } from '@angular/core';
import { GameHelper, Random } from '../../helpers';
import { MinesweeperConfig } from '../../config/minesweeper.config';
import { GameSize } from '../../enums/game-size.enum';
import { CellType } from '../../enums/cell-type.enum';
import { EmptyCell } from '../../entities/empty-cell.class';
import { Cell } from '../../entities/cell.class';

@Component({
	selector: 'minesweeper-field',
	templateUrl: './minesweeper-field.component.html',
	styleUrls: ['./minesweeper-field.component.scss'],
})
export class MinesweeperFieldComponent implements OnInit {
	@Input() private readonly size?: number;
	@Input() private readonly mines?: number;
	@Input() private readonly settings?: GameSize;

	private cellsCount = Math.pow(MinesweeperConfig.settings[GameSize.medium].size, 2);
	private gameSize = MinesweeperConfig.settings[GameSize.medium].size;
	private minesCount = MinesweeperConfig.settings[GameSize.medium].mines;

	private isFinished = false;

	private openedCells = 0;

	public generatedMines = 0;

	public game: Cell[][] = [];

	constructor() {}

	public ngOnInit(): void {
		this.initSettings();

		const emptyFiled = this.generateEmptyField();
		this.generateMines(emptyFiled);

		this.game = this.generateField(emptyFiled);
	}

	public ngAfterViewChecked(): void {
		if (this.cellsCount - this.minesCount === this.openedCells && !this.isFinished) {
			setTimeout(() => {
				this.isFinished = true;
				alert('You won');
			});
		}
	}

	private initSettings(): void {
		if (this.settings) {
			const { size, mines } = MinesweeperConfig.settings[this.settings];

			this.gameSize = size;
			this.minesCount = mines;
			this.cellsCount = size * size;
		}

		if (this.mines) {
			this.minesCount = this.mines;
		}

		if (this.size) {
			this.gameSize = this.size;
			this.cellsCount = this.size * this.size;
		}
	}

	private generateEmptyField(): EmptyCell[][] {
		const game: EmptyCell[][] = [];

		for (let i = 0; i < this.gameSize; i++) {
			game[i] = [];

			for (let y = 0; y < this.gameSize; y++) {
				game[i][y] = new EmptyCell(i, y, CellType.common);
			}
		}

		return game;
	}

	private generateMines(field: EmptyCell[][]): void {
		while (this.generatedMines < this.minesCount) {
			this.generateMine(field);
		}
	}

	private generateMine(field: EmptyCell[][]): void {
		const horizontal = Random.getNumber(0, this.gameSize - 1);
		const vertical = Random.getNumber(0, this.gameSize - 1);

		if (field[horizontal][vertical].type !== CellType.mine) {
			field[horizontal][vertical].type = CellType.mine;
			this.generatedMines++;
		}
	}

	private generateField(field: EmptyCell[][]): Cell[][] {
		const game: Cell[][] = [];

		for (let i = 0; i < this.gameSize; i++) {
			game[i] = [];

			for (let y = 0; y < this.gameSize; y++) {
				const emptyCell = field[i][y];
				const nearMinesCount = this.getNearMinesCount(field, emptyCell);

				game[i][y] = new Cell(emptyCell, emptyCell.type, nearMinesCount);
			}
		}

		return game;
	}

	private getNearMinesCount(field: EmptyCell[][], cell: EmptyCell): number {
		const nearCells: readonly EmptyCell[] = GameHelper.getNearCells(field, cell.row, cell.index);

		return nearCells.reduce((total, nearCell) => total + +GameHelper.isMine(nearCell), 0);
	}

	public handleMineClick(): void {
		alert('You lose');
	}

	public handleCellOpen(cell: Cell): void {
		cell.isOpen = true;
		this.openedCells++;

		if (cell.nearMinesCount === 0) {
			this.handleEmptyCellOpen(cell);
		}
	}

	private handleEmptyCellOpen(cell: Cell): void {
		const nearCells = GameHelper.getNearCells(this.game, cell.row, cell.index);

		nearCells.forEach((nearCell: Cell) => {
			if (!nearCell.isOpen) {
				this.handleCellOpen(nearCell);
			}
		});
	}
}
