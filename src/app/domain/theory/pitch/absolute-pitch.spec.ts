import { from } from 'rxjs';
import { AbsolutePitch } from './absolute-pitch';
import { Pitch } from './pitch';
import { PitchName } from './pitch-name';
import { PitchAlteration } from './pitch-alteration';
import { Interval } from '../interval/interval';

describe('AbsolutePitch', () => {
    it('should instance AbsolutePitch', () => {
        const pitch = AbsolutePitch.fromString('C');
        expect(pitch).toBeTruthy();
    });

    describe('Octave', () => {
        it('default octave to be 4', () => {
            const pitch = AbsolutePitch.fromString('C');
            expect(pitch.octave).toBe(4);
        });
        
        it('negative octave should throw error', () => {
            expect(() => {
                const pitch = new AbsolutePitch(new Pitch(PitchName.C), -1);
            }).toThrowError(`Invalid octave: -1`);
        });
    });

    describe('Representation', () => {
        const testCases = [ 'A4', 'B0', 'C♯1', 'D2', 'E♭3', 'F4', 'G5', 'A6', 'B7' ];

        testCases.forEach(pitchString => {
            it(`${pitchString} to be displayed properly`, () => {
                const pitch = AbsolutePitch.fromString(pitchString);
                expect(pitch.toString()).toBe(pitchString);
            });
        });

        const invalidTestCases = [ 'a', 'B#', 'Cb', '♭', 'C-1', 'E10' ];

        invalidTestCases.forEach(pitchString => {
            it(`${pitchString} should throw error`, () => {
                expect(() => {
                    const pitch = AbsolutePitch.fromString(pitchString);
                }).toThrowError(`Invalid absolute pitch string: ${pitchString}`);
            });
        });
    });

    describe('Distances', () => {
        const testCases = [
            { from: 'A', to: 'A5', distance: 12 },
            { from: 'A', to: 'A3', distance: -12 },
            { from: 'B', to: 'C5', distance: 1 },
            { from: 'C', to: 'A3', distance: -3 },
        ];

        testCases.forEach(testCase => {
            it(`distance between ${testCase.from} and ${testCase.to} should be ${testCase.distance}`, () => {
                const fromPitch = AbsolutePitch.fromString(testCase.from);
                const toPitch = AbsolutePitch.fromString(testCase.to);
                expect(fromPitch.distance(toPitch)).toBe(testCase.distance);
            });
        });
    });

    describe('Frequency', () => {
        const testCases = [
            // base tunings
            { pitch: 'A', frequency: 440 },
            { pitch: 'A', tuning: 436, frequency: 436 },
            { pitch: 'A', tuning: 442, frequency: 442 },
            // octaves
            { pitch: 'A0', frequency: 27.5 },
            { pitch: 'A1', frequency: 55 },
            { pitch: 'A2', frequency: 110 },
            { pitch: 'A3', frequency: 220 },
            { pitch: 'A4', frequency: 440 },
            { pitch: 'A5', frequency: 880 },
            { pitch: 'A6', frequency: 1760 },
            { pitch: 'A7', frequency: 3520 },
            // other pitches
            { pitch: 'C𝄪0', frequency: 18.35 },
            { pitch: 'D♯1', frequency: 38.89 },
            { pitch: 'E2', frequency: 82.41 },
            { pitch: 'F♭3', frequency: 164.81 },
            { pitch: 'G𝄫4', frequency: 349.23 }
        ]

        testCases.forEach(testCase => {
            const tuning = testCase.tuning ?? 440;
            it(`frequency for ${testCase.pitch} with base tuning ${tuning}Hz should be ${testCase.frequency}Hz`, () => {
                const pitch = AbsolutePitch.fromString(testCase.pitch);
                expect(pitch.frequency(tuning)).toBeCloseTo(testCase.frequency, 2);
            });
        });
    });

    describe('Create from interval', () => {
        const testCases = [
            { from: 'G4', interval: 'P5', expected: 'D5' },
            { from: 'B5', interval: 'A1', expected: 'B♯5' },
            { from: 'D3', interval: 'd8', expected: 'D♭4'}
        ];

        testCases.forEach(testCase => {
            it(`interval ${testCase.interval} from ${testCase.from} should be ${testCase.expected}`, () => {
                const fromPitch = AbsolutePitch.fromString(testCase.from);
                const interval = Interval.fromString(testCase.interval);
                const toPitch = AbsolutePitch.fromInterval(fromPitch, interval);
                expect(toPitch.toString()).toBe(testCase.expected);
            });
        });
    });
});