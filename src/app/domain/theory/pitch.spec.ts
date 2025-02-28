import { AbsolutePitch } from './absolute-pitch';
import { Pitch } from './pitch';
import { PitchAlteration } from './pitch-alteration';
import { PitchName } from './pitch-name';

describe('Pitch', () => {
    it('should instance Pitch', () => {
        const pitch = new Pitch(PitchName.C);
        expect(pitch).toBeTruthy();
    });

    it('default alteration to be natural', () => {
        const pitch = new Pitch(PitchName.C);
        expect(pitch.alteration).toBe(PitchAlteration.NATURAL);
    });

    describe('Representation', () => {
        it('natural A to be displayed as A', () => {
            const pitch = new Pitch(PitchName.A);
            expect(pitch.toString()).toBe('A');
        });

        it('flat B to be displayed as B♭', () => {
            const pitch = new Pitch(PitchName.B, PitchAlteration.FLAT);
            expect(pitch.toString()).toBe('B♭');
        });

        it('double flat C to be displayed as C♭♭', () => {
            const pitch = new Pitch(PitchName.C, PitchAlteration.DOUBLE_FLAT);
            expect(pitch.toString()).toBe('C♭♭');
        });

        it('sharp D to be displayed as D♯', () => {
            const pitch = new Pitch(PitchName.D, PitchAlteration.SHARP);
            expect(pitch.toString()).toBe('D♯');
        });

        it('double sharp E to be displayed as E♯♯', () => {
            const pitch = new Pitch(PitchName.E, PitchAlteration.DOUBLE_SHARP);
            expect(pitch.toString()).toBe('E♯♯');
        });
    });

    describe('Distances', () => {
        const testCases = [
            // first intervals
            { from: new Pitch(PitchName.C), to: new Pitch(PitchName.D), distance: 2 },
            { from: new Pitch(PitchName.D), to: new Pitch(PitchName.E), distance: 2 },
            { from: new Pitch(PitchName.E), to: new Pitch(PitchName.F), distance: 1 },
            { from: new Pitch(PitchName.F), to: new Pitch(PitchName.G), distance: 2 },
            { from: new Pitch(PitchName.G), to: new Pitch(PitchName.A), distance: 2 },
            { from: new Pitch(PitchName.A), to: new Pitch(PitchName.B), distance: 2 },
            { from: new Pitch(PitchName.B), to: new Pitch(PitchName.C), distance: -11 },
            // alterations
            {
                from: new Pitch(PitchName.C),
                to: new Pitch(PitchName.C, PitchAlteration.SHARP),
                distance: 1
            },
            {
                from: new Pitch(PitchName.D),
                to: new Pitch(PitchName.D, PitchAlteration.DOUBLE_SHARP),
                distance: 2
            },
            {
                from: new Pitch(PitchName.E),
                to: new Pitch(PitchName.E, PitchAlteration.FLAT),
                distance: -1
            },
            {
                from: new Pitch(PitchName.F),
                to: new Pitch(PitchName.F, PitchAlteration.DOUBLE_FLAT),
                distance: -2
            },
        ];

        testCases.forEach(testCase => {
            it(`distance from ${testCase.from.toString()} to ${testCase.to.toString()} to be ${testCase.distance}`, () => {
                expect(testCase.from.distance(testCase.to)).toBe(testCase.distance);
            });
        });
    });

});