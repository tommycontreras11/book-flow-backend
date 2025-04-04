import { BookQuickStatsEnum, BookRecentActivitiesEnum } from "./../enums/book.enum";

export interface IQuickStats {
  title: string;
  value: number;
  type: BookQuickStatsEnum;
}

export interface IRecentActivities {
  title: string;
  date?: string | null;
  type: BookRecentActivitiesEnum;
}

export interface ITopBorrowedBooks {
  title?: string | null;
  count: number;
}
