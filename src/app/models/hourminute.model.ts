export class HM {
    private _minutes: number;

    static Now(): HM {
        let now = new Date();
        let hour = now.getHours();
        let min = now.getMinutes();
        return new HM(hour, min);
    }

    constructor(hoursminutes: HM);
    constructor(minutes: number);
    constructor(strValue: string);
    constructor(hour: number, min: number);
    constructor(param1: (string | number | HM), param2?: number) {
        if (param2 !== undefined) {
            this._minutes = this._toMinutes(<number>param1, param2);
        } else if (typeof param1 === 'number') {
            this._minutes = param1;
        } else if (typeof param1 === 'string') {
            this.parse(<string>param1);
        } else {
            this._minutes = (<HM>param1).minutes;
        }
    }

    get minutes(): number {
        return this._minutes;
    }

    equals(other: HM): boolean {
        return (this.minutes === other.minutes);
    }

    sign(): number {
        return Math.sign(this._minutes);
    }

    toString(pos = '', neg = '-'): string {
        return this.signString(pos, neg) + this.format(false);
    }

    inputFormat(): string {
        return this.signString() + this.format(true);
    }

    add(add2: HM): HM {
        return new HM(this._minutes + add2._minutes);
    }

    sub(sub2: HM): HM {
        return new HM(this._minutes - sub2._minutes);
    }

    private signString(pos = '', neg = '-') {
        let sign = Math.sign(this._minutes);
        let s = (sign < 0) ? neg : pos;
        if (this._minutes === 0) {
            s = '';
        }
        return s;
    }
    private format(zeros: boolean = false) {
        let hours = this.hours;
        let minutes = this.min;

        let hrstr: string = '' + hours;
        if (zeros) {
          hrstr = ('00' + hours).substr(-2);
        }
        let minstr = ('00' + minutes).substr(-2);
        return hrstr + ':' + minstr;
    }

    private parse(value: string) {
        let sign: number;
        if (/^[\+\-]?\d{1,2}:\d{2}$/.test(value)) {
            if (value[0] === '-') {
                sign = -1;
                value = value.substr(1);
            } else if (value[0] === '+') {
                sign = 1;
                value = value.substr(1);
            } else {
                sign = 1;
            }
            let parts = value.split(':');
            this._minutes = this._toMinutes(sign * parseFloat(parts[0]),
                sign * parseFloat(parts[1]));
        } else {
            throw new Error('Invalid time string.');
        }
    }

    private get hours(): number {
        return Math.floor(Math.abs(this._minutes) / 60);
    }

    private get min(): number {
        return Math.abs(this._minutes) % 60;
    }

    private _toMinutes(hour: number, min: number) {
        let sign: number;

        if (hour !== 0) {
            sign = Math.sign(hour);
        } else {
            sign = Math.sign(min);
        }

        hour = Math.abs(hour);
        min = Math.abs(min);

        return sign * ((hour * 60) + min);
    }
}
