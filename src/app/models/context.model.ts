import { HM, Today } from './index';

export enum DayOfWeek {
  SUN = 0,
  MON,
  TUE,
  WED,
  THU,
  FRI,
  SAT
}

export class TodayTimes {
  arrive: string = '9:00';
  lunch: string = '1:00';
  leave: string = '17:00';
}

export class Context {
  today: Today;
  now: Today;

  staff: string;
  expected: TodayTimes;
  goals: string[];

  hideTimelineHelp: boolean = false;

  constructor() {
    this.staff = '';
    this.expected = new TodayTimes();
    this.goals = [
      '',
      '8:00',
      '7:48',
      '7:48',
      '7:36',
      '7:48',
      ''
    ];
  }
}
