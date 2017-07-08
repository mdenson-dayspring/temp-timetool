import { RC4Gen, SpritzGen, LCGGen, Rand } from './rand.util';

describe('RC-4 PRNG Generator', () => {
    it('Can construct from string', () => {
        let sp = new RC4Gen('password');
        expect(sp.nextByte()).toBe(255);
    });
    it('Can construct from bytearray', () => {
        let sp = new RC4Gen([1, 2, 3, 4]);
        expect(sp.nextByte()).toBe(28);
    });
    it('Test Vectors', () => {
        expect(Rand.testVector(new RC4Gen('Key'))).toBe('EB9F7781B734CA72A719');
        expect(Rand.testVector(new RC4Gen('Wiki'))).toBe('6044DB6D41B7E8E7A4D6');
        expect(Rand.testVector(new RC4Gen('Secret'))).toBe('04D46B053CA87B594172');
    });
    it('Test Dice', () => {
        expect(Rand.testDice(new RC4Gen('Key'))).toEqual([ 1671, 1651, 1673, 1661, 1675, 1669 ]);
    });
});

describe('Spritz PRNG Generator', () => {
    it('Can construct from string', () => {
        let sp = new SpritzGen('password');
        expect(sp.nextByte()).toBe(146);
    });
    it('Can construct from bytearray', () => {
        let sp = new SpritzGen([1, 2, 3, 4]);
        expect(sp.nextByte()).toBe(171);
    });
    it('Test Vectors', () => {
        expect(Rand.testVector(new SpritzGen('Key'))).toBe('65A620C27F38A9265D1E');
        expect(Rand.testVector(new SpritzGen('Wiki'))).toBe('FC40E0E4E34A18FB7B1F');
        expect(Rand.testVector(new SpritzGen('Secret'))).toBe('CD6C5E6E2894C96F0B78');
    });
    it('Test Dice', () => {
        expect(Rand.testDice(new SpritzGen('Key'))).toEqual([ 1641, 1675, 1663, 1707, 1614, 1700 ]);
    });
});

describe('LCG PRNG Generator', () => {
    it('Can construct from seed', () => {
        let sp = new LCGGen(0);
        expect(sp.nextByte()).toBe(135);
    });
    it('Can construct without seed', () => {
        let sp = new LCGGen();
    });
    it('Test Vectors', () => {
        expect(Rand.testVector(new LCGGen(0))).toBe('87A241940B566568CF4A');
        expect(Rand.testVector(new LCGGen(12345678))).toBe('FD2027C2E1B4AB760588');
        expect(Rand.testVector(new LCGGen(987654321))).toBe('44FB86D518BF7A392CC3');
    });
    it('Test Dice', () => {
        expect(Rand.testDice(new LCGGen(12345678))).toEqual([ 1679, 1679, 1680, 1682, 1641, 1639 ]);
    });
});

describe('Plugable PRNG', () => {
    it('Can construct with Spritz', () => {
        let rnd = new Rand(new SpritzGen('password'));
        expect(rnd.nextByte()).toBe(146);
    });
    it('nextByte with and withour modulo', () => {
        let rnd = new Rand(new SpritzGen('password'));
        expect(rnd.nextByte()).toBe(146);
        rnd = new Rand(new SpritzGen('password'));
        expect(rnd.nextByte(16)).toBe(2);
    });
    it('nextInt with and withour modulo', () => {
        let rnd = new Rand(new SpritzGen('password'));
        expect(rnd.nextInt()).toBe(2455809831);
        rnd = new Rand(new SpritzGen('password'));
        expect(rnd.nextInt(512)).toBe(295);
    });
});
