import { HM } from './index';

describe('HourMinute Model Class', () => {
    it('Can construct from string with colon', () => {
        let hm = new HM('10:00');
        expect(hm.minutes).toBe(600);
        hm = new HM('-10:36');
        expect(hm.minutes).toBe(-636);
        hm = new HM('-0:36');
        expect(hm.minutes).toBe(-36);
        hm = new HM('+9:36');
        expect(hm.minutes).toBe(576);
    });
    it('Can construct from minutes', () => {
        let hm = new HM(10);
        expect(hm.minutes).toBe(10);
        hm = new HM(-1030);
        expect(hm.minutes).toBe(-1030);
        hm = new HM(1030);
        expect(hm.minutes).toBe(1030);
        hm = new HM(1070);
        expect(hm.minutes).toBe(1070);
        hm = new HM(-1070);
        expect(hm.minutes).toBe(-1070);
    });
    it('Can construct from hour-minute', () => {
        let hm = new HM(10, 6);
        expect(hm.minutes).toBe(606);
        hm = new HM(-10, 6);
        expect(hm.minutes).toBe(-606);
        hm = new HM(10, -6);
        expect(hm.minutes).toBe(606);
        hm = new HM(0, -6);
        expect(hm.minutes).toBe(-6);
        hm = new HM(2, -120);
        expect(hm.minutes).toBe(240);
        hm = new HM(-2, 120);
        expect(hm.minutes).toBe(-240);
        hm = new HM(4, 120);
        expect(hm.minutes).toBe(360);
        hm = new HM(0, -120);
        expect(hm.minutes).toBe(-120);
        hm = new HM(0, 120);
        expect(hm.minutes).toBe(120);
    });
    it('toString with default signs', () => {
        let hm = new HM(10, 6);
        expect(hm.toString()).toBe('10:06');
        hm = new HM(-10, 6);
        expect(hm.toString()).toBe('-10:06');
    });
    it('toString with changed signs', () => {
        let hm = new HM(10, 6);
        expect(hm.toString('+')).toBe('+10:06');
        hm = new HM(-10, 6);
        expect(hm.toString('+', '--')).toBe('--10:06');
    });
    it('edge cases in toString', () => {
        let hm = new HM(10, 59);
        expect(hm.toString()).toBe('10:59');
        hm = new HM(659);
        expect(hm.toString()).toBe('10:59');
        hm = new HM(0, 90);
        expect(hm.toString()).toBe('1:30');
        hm = new HM(0, 120);
        expect(hm.toString()).toBe('2:00');
        hm = new HM(-0);
        expect(hm.toString()).toBe('0:00');
    });
    it('add 2 HM values', () => {
        let one = new HM(4, 12);
        let two = new HM(5, 36);
        expect(one.add(one).toString()).toBe('8:24');
        expect(one.add(two).toString()).toBe('9:48');
        expect(two.add(two).toString()).toBe('11:12');
        two = new HM(-5, 36);
        expect(one.add(two).toString()).toBe('-1:24');
        expect(two.add(one).toString()).toBe('-1:24');
    });
    it('sub 2 HM values', () => {
        let one = new HM(4, 12);
        let two = new HM(5, 36);
        expect(one.sub(one).toString()).toBe('0:00');
        expect(one.sub(two).toString()).toBe('-1:24');
        expect(two.sub(one).toString()).toBe('1:24');
        expect(two.sub(two).toString()).toBe('0:00');
        two = new HM(-5, 36);
        expect(one.sub(two).toString()).toBe('9:48');
        expect(two.sub(one).toString()).toBe('-9:48');
    });

    it('equality test', () => {
        let one = new HM(4, 12);
        let two = new HM(5, 36);
        let three = new HM(4, 12);
        expect(one.equals(two)).toBe(false);
        expect(one.equals(one)).toBe(true);
        expect(one.equals(three)).toBe(true);
    });

    it('test HM.now()', () => {
        let nowDate = new Date();
        let nowHM = HM.Now();
        let nowFromDate = new HM(nowDate.getHours(), nowDate.getMinutes());
        expect(nowHM).toEqual(nowFromDate);
    });
});
