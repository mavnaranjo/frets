import { Interval } from "./interval";
import { IntervalNumber } from "./interval-number";
import { IntervalQuality } from "./interval-quality";

describe('Interval', () => {
    it('should instance Interval', () => {
        const interval = new Interval(
            IntervalNumber.UNISON,
            IntervalQuality.PERFECT
        );

        expect(interval).toBeTruthy();
    });

    describe('Presentation', () => {
        const testCases = [ 'P1', 'm2', 'M3', 'd4', 'A5', 'm6', 'M7', 'P8' ];

        testCases.forEach(intervalString => {
            it(`${intervalString} to be displayed properly`, () => {
                const interval = Interval.fromString(intervalString);
                expect(interval.toString()).toBe(intervalString);
            }); 
        });

        const invalidTestCases = [ 'p1', 'm0', 'M', '2' ];

        invalidTestCases.forEach(intervalString => {
            it(`interval ${intervalString} should throw error`, () => {
                expect(() => {
                    const interval = Interval.fromString(intervalString);
                }).toThrowError(`Invalid interval string: ${intervalString}`);
            });
        });
    });

    describe('Correct intervals', () => {
        const correctTestCases = [
            { interval: 'P1', number: IntervalNumber.UNISON, quality: IntervalQuality.PERFECT },
            { interval: 'd1', number: IntervalNumber.UNISON, quality: IntervalQuality.DIMINISHED },
            { interval: 'A1', number: IntervalNumber.UNISON, quality: IntervalQuality.AUGMENTED },
            { interval: 'm2', number: IntervalNumber.SECOND, quality: IntervalQuality.MINOR },
            { interval: 'M2', number: IntervalNumber.SECOND, quality: IntervalQuality.MAJOR },
            { interval: 'd2', number: IntervalNumber.SECOND, quality: IntervalQuality.DIMINISHED },
            { interval: 'A2', number: IntervalNumber.SECOND, quality: IntervalQuality.AUGMENTED },
            { interval: 'm3', number: IntervalNumber.THIRD, quality: IntervalQuality.MINOR },
            { interval: 'M3', number: IntervalNumber.THIRD, quality: IntervalQuality.MAJOR },
            { interval: 'd3', number: IntervalNumber.THIRD, quality: IntervalQuality.DIMINISHED },
            { interval: 'P4', number: IntervalNumber.FOURTH, quality: IntervalQuality.PERFECT },
            { interval: 'd4', number: IntervalNumber.FOURTH, quality: IntervalQuality.DIMINISHED },
            { interval: 'P5', number: IntervalNumber.FIFTH, quality: IntervalQuality.PERFECT },
            { interval: 'd5', number: IntervalNumber.FIFTH, quality: IntervalQuality.DIMINISHED },
            { interval: 'A5', number: IntervalNumber.FIFTH, quality: IntervalQuality.AUGMENTED },
            { interval: 'm6', number: IntervalNumber.SIXTH, quality: IntervalQuality.MINOR },
            { interval: 'M6', number: IntervalNumber.SIXTH, quality: IntervalQuality.MAJOR },
            { interval: 'd6', number: IntervalNumber.SIXTH, quality: IntervalQuality.DIMINISHED },
            { interval: 'A6', number: IntervalNumber.SIXTH, quality: IntervalQuality.AUGMENTED },
            { interval: 'm7', number: IntervalNumber.SEVENTH, quality: IntervalQuality.MINOR },
            { interval: 'M7', number: IntervalNumber.SEVENTH, quality: IntervalQuality.MAJOR },
            { interval: 'd7', number: IntervalNumber.SEVENTH, quality: IntervalQuality.DIMINISHED },
            { interval: 'A7', number: IntervalNumber.SEVENTH, quality: IntervalQuality.AUGMENTED },
            { interval: 'P8', number: IntervalNumber.OCTAVE, quality: IntervalQuality.PERFECT },
            { interval: 'd8', number: IntervalNumber.OCTAVE, quality: IntervalQuality.DIMINISHED },
            { interval: 'A8', number: IntervalNumber.OCTAVE, quality: IntervalQuality.AUGMENTED },
        ];

        correctTestCases.forEach(testCase => {
            it(`interval ${testCase.interval} should be OK`, () => {
                const interval = Interval.fromString(testCase.interval);
                expect(interval).toBeTruthy();
                expect(interval.number).toBe(testCase.number);
                expect(interval.quality).toBe(testCase.quality);
                expect(interval.toString()).toBe(testCase.interval);
            });
        });
    });

    describe('Incorrect intervals', () => {
        const incorrectTestCases = ['m1', 'M1', 'P2', 'P3', 'm4', 'M4', 'm5', 'M5', 'P6', 'P7', 'm8', 'M8'];

        incorrectTestCases.forEach(incorrectInterval => {
            it(`interval ${incorrectInterval} should throw error`, () => {
                expect(() => {
                    const interval = Interval.fromString(incorrectInterval);
                }).toThrowError(`Invalid interval`);
            });
        });
    });

    describe('Interval distance', () => {
        const testCases = [
            { interval: 'd1', distance: -1 },
            { interval: 'P1', distance: 0 },
            { interval: 'A1', distance: 1 },
            { interval: 'd2', distance: 0 },
            { interval: 'm2', distance: 1 },
            { interval: 'M2', distance: 2 },
            { interval: 'A2', distance: 3 },
            { interval: 'd3', distance: 2 },
            { interval: 'm3', distance: 3 },
            { interval: 'M3', distance: 4 },
            { interval: 'A3', distance: 5 },
            { interval: 'd4', distance: 4 },
            { interval: 'P4', distance: 5 },
            { interval: 'A4', distance: 6 },
            { interval: 'd5', distance: 6 },
            { interval: 'P5', distance: 7 },
            { interval: 'A5', distance: 8 },
            { interval: 'd6', distance: 7 },
            { interval: 'm6', distance: 8 },
            { interval: 'M6', distance: 9 },
            { interval: 'A6', distance: 10 },
            { interval: 'd7', distance: 9 },
            { interval: 'm7', distance: 10 },
            { interval: 'M7', distance: 11 },
            { interval: 'A7', distance: 12 },
            { interval: 'd8', distance: 11 },
            { interval: 'P8', distance: 12 },
            { interval: 'A8', distance: 13 },
        ];

        testCases.forEach(testCase => {
            it(`interval ${testCase.interval} should have distance ${testCase.distance}`, () => {
                const interval = Interval.fromString(testCase.interval);
                expect(interval.distance).toBe(testCase.distance);
            });
        });
    });
});