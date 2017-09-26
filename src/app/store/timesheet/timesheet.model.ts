import { DayInfo } from '../../models/dayinfo.model';

export interface TimesheetWeek {
  // canonical date for the week displayed (Sunday)
  date: Date;
  week: DayInfo[];
}
