import { DayInfo, HM } from './index';

describe('DayInfo Model Class', () => {
    it('Can construct with just the name', () => {
        let di = new DayInfo('Monday');
        expect(di.name).toBe('Monday');
        expect(di.getActual()).toBeUndefined();
        expect(di.getGoal()).toBeUndefined();
        expect(di.getHours()).toBeUndefined();
        expect(di.getDiff()).toBeUndefined();
    });
});
