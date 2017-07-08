import { List } from './merge.util';

describe('Mergable List', () => {
    it('Can construct from an array', () => {
        let odds = new List([1, 3, 5, 7]);
        let evens = new List([2, 4, 6, 8]);
        expect(odds.length()).toBe(4);
        expect(evens.length()).toBe(4);
        expect(evens.get(1)).toBe(4);
    });
    it('Get Exception getting past end', () => {
        let odds = new List([1, 3, 5, 7]);
        try {
            odds.get(6);
            fail("Didn't throw error.");
        } catch (e) { }
    });
    it('Can do a simple merge of two lists', () => {
        let odds = new List([1, 3, 5, 7]);
        let evens = new List([2, 4, 6, 8]);
        let all = odds.merge(evens);
        expect(all.length()).toBe(8);
        expect(all.get(0)).toBe(1);
        expect(all.get(1)).toBe(2);
        expect(all.get(2)).toBe(3);
        expect(all.get(6)).toBe(7);
        expect(all.get(7)).toBe(8);
    });
    it('Can do a simple merge of two lists (one empty)', () => {
        let odds = new List([]);
        let evens = new List([2, 4, 6, 8]);
        let all = odds.merge(evens);
        expect(all.length()).toBe(4);
        expect(all.get(0)).toBe(2);
        expect(all.get(1)).toBe(4);
        expect(all.get(2)).toBe(6);
        expect(all.get(3)).toBe(8);
    });
});

describe('Mergable List (Simple Linear Merge)', () => {
    it('Can do a linear merge of no lists', () => {
        let all = List.mergeLinear();
        expect(all.length()).toBe(0);
    });
    it('Can do a linear merge of two lists', () => {
        let odds = new List([1, 3, 5, 7]);
        let evens = new List([2, 4, 6, 8]);
        let all = List.mergeLinear(odds, evens);
        expect(all.length()).toBe(8);
        expect(all.get(0)).toBe(1);
        expect(all.get(1)).toBe(2);
        expect(all.get(2)).toBe(3);
        expect(all.get(6)).toBe(7);
        expect(all.get(7)).toBe(8);
    });
    it('Can do a linear merge of four lists', () => {
        let one = new List([1, 3, 5, 7]);
        let two = new List([2, 4, 6, 8]);
        let three = new List([20, 40, 60, 80]);
        let four = new List([22, 24]);
        let all = List.mergeLinear(one, two, three, four);
        expect(all.length()).toBe(14);
        expect(all.get(0)).toBe(1);
        expect(all.get(1)).toBe(2);
        expect(all.get(2)).toBe(3);
        expect(all.get(6)).toBe(7);
        expect(all.get(7)).toBe(8);

        expect(all.get(8)).toBe(20);
        expect(all.get(9)).toBe(22);
        expect(all.get(10)).toBe(24);
        expect(all.get(11)).toBe(40);
    });
});

describe('Mergable List (Tournament Merge)', () => {
    it('Can do a merge of no lists', () => {
        let all = List.mergeTournament();
        expect(all.length()).toBe(0);
    });
    it('Can do a merge of two lists', () => {
        let odds = new List([1, 3, 5, 7]);
        let evens = new List([2, 4, 6, 8]);
        let all = List.mergeTournament(odds, evens);
        expect(all.length()).toBe(8);
        expect(all.get(0)).toBe(1);
        expect(all.get(1)).toBe(2);
        expect(all.get(2)).toBe(3);
        expect(all.get(6)).toBe(7);
        expect(all.get(7)).toBe(8);
    });
    it('Can do a merge of four lists', () => {
        let one = new List([1, 3, 5, 7]);
        let two = new List([2, 4, 6, 8]);
        let three = new List([20, 40, 60, 80]);
        let four = new List([22, 24]);
        let all = List.mergeTournament(one, two, three, four);
        expect(all.length()).toBe(14);
        expect(all.get(0)).toBe(1);
        expect(all.get(1)).toBe(2);
        expect(all.get(2)).toBe(3);
        expect(all.get(6)).toBe(7);
        expect(all.get(7)).toBe(8);

        expect(all.get(8)).toBe(20);
        expect(all.get(9)).toBe(22);
        expect(all.get(10)).toBe(24);
        expect(all.get(11)).toBe(40);
    });
    it('Can do a merge of three lists', () => {
        let one = new List([1, 3, 5, 7]);
        let two = new List([2, 4, 6, 8]);
        let four = new List([22, 24]);
        let all = List.mergeTournament(one, two, four);
        expect(all.length()).toBe(10);
        expect(all.get(0)).toBe(1);
        expect(all.get(1)).toBe(2);
        expect(all.get(2)).toBe(3);
        expect(all.get(6)).toBe(7);
        expect(all.get(7)).toBe(8);

        expect(all.get(8)).toBe(22);
        expect(all.get(9)).toBe(24);
    });
});
