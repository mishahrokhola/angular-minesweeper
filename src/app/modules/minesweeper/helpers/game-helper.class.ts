import { CellType } from '../enums/cell-type.enum';
import { EmptyCell } from '../entities/empty-cell.class';

export class GameHelper {
	public static isMine<T extends EmptyCell>(cell: T): boolean {
		return cell.type === CellType.mine;
	}

	public static getNearCells<T extends EmptyCell>(game: readonly T[][], row: number, index: number): readonly T[] {
		const nearRows: readonly T[][] = GameHelper.getNearRows(game, row);

		let nearCells: T[] = [];

		for (const nearRow of nearRows) {
			nearCells = nearCells.concat(GameHelper.getRowNearCell(nearRow, index));
		}

		if (game[row][index - 1]) {
			nearCells.push(game[row][index - 1]);
		}

		if (game[row][index + 1]) {
			nearCells.push(game[row][index + 1]);
		}

		return nearCells;
	}

	public static getRowNearCell<T extends EmptyCell>(row: readonly T[], index: number): readonly T[] {
		const nearCells: T[] = [];

		if (row[index - 1]) {
			nearCells.push(row[index - 1]);
		}

		if (row[index]) {
			nearCells.push(row[index]);
		}

		if (row[index + 1]) {
			nearCells.push(row[index + 1]);
		}

		return nearCells;
	}

	public static getNearRows<T extends EmptyCell>(game: readonly T[][], row: number): readonly T[][] {
		const nearRows: T[][] = [];

		if (game[row - 1]) {
			nearRows.push(game[row - 1]);
		}

		if (game[row + 1]) {
			nearRows.push(game[row + 1]);
		}

		return nearRows;
	}
}
