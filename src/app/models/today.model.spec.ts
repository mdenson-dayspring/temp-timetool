import { Today, HM } from './index';

describe('Today Model Class', () => {
    it('No argument constructor', () => {
        let t = new Today();
        expect(t.arrive.minutes).toEqual(0);
        expect(t.lunch.minutes).toEqual(0);
        expect(t.leave.minutes).toEqual(0);
        expect(t.hours.minutes).toEqual(0);
        expect(t.hoursLessLunch.minutes).toEqual(0);
        expect(t.toString()).toEqual('0:00');
    });
    it('One argument constructor', () => {
        let t = new Today(new HM('10:00'));
        expect(t.arrive.minutes).toEqual(600);
        expect(t.lunch.minutes).toEqual(0);
        expect(t.leave.minutes).toEqual(600);
        expect(t.hours.minutes).toEqual(0);
        expect(t.hoursLessLunch.minutes).toEqual(0);
        expect(t.toString()).toEqual('0:00');
    });
    it('Two argument constructor', () => {
        let t = new Today(new HM('10:00'), new HM('0:30'));
        expect(t.arrive.minutes).toEqual(600);
        expect(t.lunch.minutes).toEqual(30);
        expect(t.leave.minutes).toEqual(600);
        expect(t.hours.minutes).toEqual(0);
        expect(t.hoursLessLunch.minutes).toEqual(-30);
        expect(t.toString()).toEqual('0:00');
    });
    it('Three argument constructor', () => {
        let t = new Today(new HM('10:00'), new HM('0:30'), new HM('11:00'));
        expect(t.arrive.minutes).toEqual(600);
        expect(t.lunch.minutes).toEqual(30);
        expect(t.leave.minutes).toEqual(660);
        expect(t.hours.minutes).toEqual(60);
        expect(t.hoursLessLunch.minutes).toEqual(30);
        expect(t.toString()).toEqual('1:00');
    });
    it('Time Left', () => {
        let now = HM.Now(), tenMinutes = new HM(10);
        let t = new Today(new HM('10:00'), new HM('0:30'), now.add(tenMinutes));
        expect(t.timeLeft().minutes).toEqual(10);
    });
});
