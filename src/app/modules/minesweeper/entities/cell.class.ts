import { CellType } from '../enums/cell-type.enum';
import { EmptyCell } from './empty-cell.class';

export class Cell extends EmptyCell {
	constructor(
		public readonly emptyCell: EmptyCell,
		public readonly type: CellType,
		public readonly nearMinesCount: number
	) {
		super(emptyCell.row, emptyCell.index, type);
	}
}
