import { Pitch } from './pitch';
import { PitchAlteration } from './pitch-alteration';

describe('Pitch', () => {
    it('should instance Pitch', () => {
        const pitch = Pitch.fromString('C');
        expect(pitch).toBeTruthy();
    });

    it('default alteration to be natural', () => {
        const pitch = Pitch.fromString('C');
        expect(pitch.alteration).toBe(PitchAlteration.NATURAL);
    });

    describe('Representation', () => {
        const testCases = [ 'A', 'B♭', 'C♭♭', 'D♯', 'E♯♯' ];

        testCases.forEach(pitchString => {
            it(`${pitchString} to be displayed properly`, () => {
                const pitch = Pitch.fromString(pitchString);
                expect(pitch.toString()).toBe(pitchString);
            }); 
        });
    });

    describe('Distances', () => {
        const testCases = [
            // first intervals
            { from: 'C', to: 'D', distance: 2 },
            { from: 'D', to: 'E', distance: 2 },
            { from: 'E', to: 'F', distance: 1 },
            { from: 'F', to: 'G', distance: 2 },
            { from: 'G', to: 'A', distance: 2 },
            { from: 'A', to: 'B', distance: 2 },
            { from: 'B', to: 'C', distance: -11 },
            // alterations
            { from: 'C', to: 'C♯', distance: 1 },
            { from: 'D', to: 'D♯♯', distance: 2 },
            { from: 'E', to: 'E♭', distance: -1 },
            { from: 'F', to: 'F♭♭', distance: -2 }
        ];

        testCases.forEach(testCase => {
            it(`distance from ${testCase.from} to ${testCase.to} to be ${testCase.distance}`, () => {
                const fromPitch = Pitch.fromString(testCase.from);
                const toPitch = Pitch.fromString(testCase.to);
                expect(fromPitch.distance(toPitch)).toBe(testCase.distance);
            });
        });
    });

});