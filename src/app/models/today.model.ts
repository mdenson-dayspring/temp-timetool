import { HM } from './index';

export class Today {
    arrive: HM;
    lunch: HM;
    leave: HM;
    hours: HM;
    hoursLessLunch: HM;

    constructor(arrive?: HM, lunch?: HM, leave?: HM) {
        if (arrive === undefined) arrive = new HM(0);
        if (lunch === undefined) lunch = new HM(0);
        if (leave === undefined) leave = new HM(arrive);

        this.arrive = arrive;
        this.lunch = lunch;
        this.leave = leave;

        this.hours = this.leave.sub(this.arrive);
        this.hoursLessLunch = this.hours.sub(this.lunch);
    }

    public timeLeft(): HM {
        return this.leave.sub(HM.Now());
    }
    public toString(): string {
        return this.hours.toString();
    }
}
