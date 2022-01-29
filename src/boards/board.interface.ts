export interface ColumnInterface {
  id?: string;
  title: string;
  order: number;
}

export interface IBoard {
  id: string;
  title: string;
  columns: ColumnInterface[];
}

export interface IBoardUpdate {
  title?: string;
  columns?: ColumnInterface[];
}

export interface IBoardCreate {
  title: string;
  columns: ColumnInterface[];
}
