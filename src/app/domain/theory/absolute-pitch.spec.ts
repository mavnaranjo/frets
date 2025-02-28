import { from } from 'rxjs';
import { AbsolutePitch } from './absolute-pitch';
import { Pitch } from './pitch';
import { PitchName } from './pitch-name';
import { PitchAlteration } from './pitch-alteration';

describe('AbsolutePitch', () => {
    it('should instance AbsolutePitch', () => {
        const pitch = new AbsolutePitch(new Pitch(PitchName.C));
        expect(pitch).toBeTruthy();
    });
    
    it('default octave to be 4', () => {
        const pitch = new AbsolutePitch(new Pitch(PitchName.C));
        expect(pitch.octave).toBe(4);
    });

    describe('Representation', () => {
        const testCases = [
            { pitch: new AbsolutePitch(new Pitch(PitchName.A)), expected: 'A4' },
            { pitch: new AbsolutePitch(new Pitch(PitchName.B), 0), expected: 'B0' },
            { pitch: new AbsolutePitch(new Pitch(PitchName.C), 1), expected: 'C1' },
            { pitch: new AbsolutePitch(new Pitch(PitchName.D), 2), expected: 'D2' },
            { pitch: new AbsolutePitch(new Pitch(PitchName.E), 3), expected: 'E3' },
            { pitch: new AbsolutePitch(new Pitch(PitchName.F), 4), expected: 'F4' },
            { pitch: new AbsolutePitch(new Pitch(PitchName.G), 5), expected: 'G5' },
            { pitch: new AbsolutePitch(new Pitch(PitchName.A), 6), expected: 'A6' },
            { pitch: new AbsolutePitch(new Pitch(PitchName.B), 7), expected: 'B7' },
        ];

        testCases.forEach(testCase => {
            it(`${testCase.pitch.toString()} to be displayed as ${testCase.expected}`, () => {
                expect(testCase.pitch.toString()).toBe(testCase.expected);
            });
        });
    });

    describe('Distances', () => {
        const testCases = [
            {
                from: new AbsolutePitch(new Pitch(PitchName.A)),
                to: new AbsolutePitch(new Pitch(PitchName.A), 5),
                distance: 12
            },
            {
                from: new AbsolutePitch(new Pitch(PitchName.A)),
                to: new AbsolutePitch(new Pitch(PitchName.A), 3),
                distance: -12
            },
            {
                from: new AbsolutePitch(new Pitch(PitchName.B)),
                to: new AbsolutePitch(new Pitch(PitchName.C), 5),
                distance: 1
            },
            {
                from: new AbsolutePitch(new Pitch(PitchName.C)),
                to: new AbsolutePitch(new Pitch(PitchName.A), 3),
                distance: -3
            },
        ];

        testCases.forEach(testCase => {
            it(`distance between ${testCase.from.toString()} and ${testCase.to.toString()} should be ${testCase.distance}`, () => {
                expect(testCase.from.distance(testCase.to)).toBe(testCase.distance);
            });
        });
    });

    describe('Frequency', () => {
        const testCases = [
            // base tunings
            { pitch: new AbsolutePitch(new Pitch(PitchName.A)), frequency: 440 },
            { pitch: new AbsolutePitch(new Pitch(PitchName.A)), tuning: 436, frequency: 436 },
            { pitch: new AbsolutePitch(new Pitch(PitchName.A)), tuning: 442, frequency: 442 },
            // octaves
            { pitch: new AbsolutePitch(new Pitch(PitchName.A), 0), frequency: 27.5 },
            { pitch: new AbsolutePitch(new Pitch(PitchName.A), 1), frequency: 55 },
            { pitch: new AbsolutePitch(new Pitch(PitchName.A), 2), frequency: 110 },
            { pitch: new AbsolutePitch(new Pitch(PitchName.A), 3), frequency: 220 },
            { pitch: new AbsolutePitch(new Pitch(PitchName.A), 4), frequency: 440 },
            { pitch: new AbsolutePitch(new Pitch(PitchName.A), 5), frequency: 880 },
            { pitch: new AbsolutePitch(new Pitch(PitchName.A), 6), frequency: 1760 },
            { pitch: new AbsolutePitch(new Pitch(PitchName.A), 7), frequency: 3520 },
            // other pitches
            {
                pitch: new AbsolutePitch(new Pitch(PitchName.C, PitchAlteration.DOUBLE_SHARP), 0),
                frequency: 18.35
            },
            {
                pitch: new AbsolutePitch(new Pitch(PitchName.D, PitchAlteration.SHARP), 1),
                frequency: 38.89
            },
            {
                pitch: new AbsolutePitch(new Pitch(PitchName.E), 2),
                frequency: 82.41
            },
            {
                pitch: new AbsolutePitch(new Pitch(PitchName.F, PitchAlteration.FLAT), 3),
                frequency: 164.81
            },
            {
                pitch: new AbsolutePitch(new Pitch(PitchName.G, PitchAlteration.DOUBLE_FLAT), 4),
                frequency: 349.23
            },

        ]

        testCases.forEach(testCase => {
            const tuning = testCase.tuning ?? 440;
            it(`frequency for ${testCase.pitch.toString()} with base tuning ${tuning}Hz should be ${testCase.frequency}Hz`, () => {
                expect(testCase.pitch.frequency(tuning ?? 440)).toBeCloseTo(testCase.frequency, 2);
            });
        });
    });
});