import { DayInfo, DayOfWeek, HM } from './index';

describe('DayInfo Model Class', () => {
    it('Can construct with just the name', () => {
        let di = new DayInfo(DayOfWeek.MON);
        expect(di.name).toBe('Monday');
        expect(di.actual).toBeUndefined();
        expect(di.goal).toBeUndefined();
        expect(di.getHours()).toBeUndefined();
        expect(di.getDiff()).toBeUndefined();
    });
});

describe('DayInfo interactions', () => {
    it('Can construct with just the name', () => {
        let di = new DayInfo(DayOfWeek.TUE);
        expect(di.name).toBe('Tuesday');
    });
});
