import { CellType } from '../enums/cell-type.enum';

export class EmptyCell {
	public isOpen = false;
	public isFlagged = false;

	constructor(public readonly row: number, public readonly index: number, public type: CellType) {}
}
