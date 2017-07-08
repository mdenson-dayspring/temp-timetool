export interface Generator {
    nextByte(): number;
}

/**
 * ## Linear Congruential PNRG Generator
 *
 * For random numbers, we will use a mixed linear congruential generator a x + c (mod m).
 *
 * Where:
 *     a = 69069
 *     c = 1234567
 *     m = 429496729
 *
 * Test vectors.
 *     0         => '87A241940B566568CF4A'
 *     12345678  => 'FD2027C2E1B4AB760588'
 *     987654321 => '44FB86D518BF7A392CC3'
 */
export class LCGGen implements Generator {
    private a = 69069;
    private c = 1234567;
    private m = 4294967296;
    private seed: number;

    constructor(seed?: number) {
        if (seed !== undefined) {
            this.seed = seed % this.m;
        } else {
            this.seed = Date.now() % this.m;
        }
    }

    nextByte(): number {
        this.seed = (this.a * this.seed + this.c) % this.m;
        return this.seed % 256;
    }
}
/**
 * ## RC-4 PRNG Generator
 *
 * Test vectors.
 *     'Key'    => 'EB9F7781B734CA72A719'
 *     'Wiki'   => '6044DB6D41B7E8E7A4D6'
 *     'Secret' => '04D46B053CA87B594172'
 */
export class RC4Gen implements Generator {
    private S: number[];
    private i: number;
    private j: number;
    private k: number;
    private z: number;

    constructor(key: (string | number[])) {
        let keyBytes: number[] = [];
        if (typeof key === 'string') {
            for (let i = 0; i < key.length; i++) {
                keyBytes[i] = key.charCodeAt(i);
            }
        } else {
            keyBytes = key;
        }
        this.S = [];
        this._keyScheduling(keyBytes);
        this.i = 0; this.j = 0;
    }
    nextByte(): number {
        this.i = (this.i + 1) % 256;
        this.j = (this.j + this.S[this.i]) % 256;

        let t = this.S[this.i]; this.S[this.i] = this.S[this.j]; this.S[this.j] = t;

        return this.S[(this.S[this.i] + this.S[this.j]) % 256];
    }
    private _keyScheduling(key: number[]): void {
        let i = 0, j = 0;

        for (i = 0; i < 256; i++) { this.S[i] = i; }

        let keylen = key.length;
        for (i = 0; i < 256; i++) {
            j = (j + this.S[i] + key[i % keylen]) % 256;
            let t = this.S[i]; this.S[i] = this.S[j]; this.S[j] = t;
        }
    }
}

/**
 * ## Spritz PRNG Generator
 *
 * Modified RC-4 with w = 29;
 *
 * Test vectors.
 *     'Key'    => '65A620C27F38A9265D1E'
 *     'Wiki'   => 'FC40E0E4E34A18FB7B1F'
 *     'Secret' => 'CD6C5E6E2894C96F0B78'
 */
export class SpritzGen implements Generator {
    private S: number[];
    private i: number;
    private j: number;
    private k: number;
    private z: number;

    constructor(key: (string | number[])) {
        let keyBytes: number[] = [];
        if (typeof key === 'string') {
            let kstring = key as string;
            for (let i = 0; i < kstring.length; i++) {
                keyBytes[i] = kstring.charCodeAt(i);
            }
        } else {
            keyBytes = key;
        }
        this.S = [];
        this._keyScheduling(keyBytes);
        this.i = 0; this.j = 0; this.k = 0; this.z = 0;
    }

    nextByte(): number {
        this.i = (this.i + 29) % 256;
        this.j = (this.k + this.S[(this.j + this.S[this.i]) % 256]) % 256;
        this.k = (this.k + this.i + this.S[this.j]) % 256;

        let t = this.S[this.i]; this.S[this.i] = this.S[this.j]; this.S[this.j] = t;

        this.z = this.S[(this.j + this.S[(this.i + this.S[(this.z + this.k) % 256]) % 256]) % 256];
        return this.z;
    }

    private _keyScheduling(key: number[]): void {
        let i = 0, j = 0;

        for (i = 0; i < 256; i++) { this.S[i] = i; }

        let keylen = key.length;
        for (i = 0; i < 256; i++) {
            j = (j + this.S[i] + key[i % keylen]) % 256;
            let t = this.S[i]; this.S[i] = this.S[j]; this.S[j] = t;
        }
    }
}

export class Rand {
    private gen: Generator;

    static testVector(generator: Generator): string {
        let rnd = new Rand(generator);
        let keyStream = '';
        for (let p = 0; p < 10; p++) {
            let byte = '00' + rnd.nextByte().toString(16).toUpperCase();
            keyStream += byte.substr(byte.length - 2);
        }
        return keyStream;
    }

    static testDice(generator: Generator): number[] {
        let dice: number[] = [];

        for (let i = 0; i < 6; i++) {
            dice[i] = 0;
        }

        let rnd = new Rand(generator);
        for (let j = 0; j < 10000; j++) {
            let ndx = rnd.nextByte(6);
            dice[ndx]++;
        }

        return dice;
    }

    constructor(generator: Generator) {
        this.gen = generator;
    }

    nextByte(modulo?: number): number {
        let ret = this.gen.nextByte();
        if (modulo === undefined) {
            return ret;
        } else {
            return ret % modulo;
        }
    }

    nextInt(modulo?: number): number {
        let ret = 0;
        for (let i = 0; i < 4; i++) {
            ret = (ret * 256) + this.gen.nextByte();
        }
        if (modulo === undefined) {
            return ret;
        } else {
            return ret % modulo;
        }
    }
}

