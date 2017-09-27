import { HM, Today } from '../../models';

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

  touchSupported: boolean = false;
  hoverSupported: boolean = false;
  hideTimelineHelp: boolean = false;
  hideWeekHelp: boolean = false;

  constructor() {
    this.staff = '';
    this.expected = new TodayTimes();
    this.goals = [
      '',
      '8:00',
      '8:00',
      '8:00',
      '8:00',
      '8:00',
      ''
    ];
  }
}
