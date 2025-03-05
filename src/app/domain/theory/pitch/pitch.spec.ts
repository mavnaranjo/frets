import { Interval } from '../interval/interval';
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
        const testCases = [ 'A', 'B♭', 'C𝄫', 'D♯', 'E𝄪' ];

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
            { from: 'D', to: 'D𝄪', distance: 2 },
            { from: 'E', to: 'E♭', distance: -1 },
            { from: 'F', to: 'F𝄫', distance: -2 }
        ];

        testCases.forEach(testCase => {
            it(`distance from ${testCase.from} to ${testCase.to} to be ${testCase.distance}`, () => {
                const fromPitch = Pitch.fromString(testCase.from);
                const toPitch = Pitch.fromString(testCase.to);
                expect(fromPitch.distance(toPitch)).toBe(testCase.distance);
            });
        });
    });

    describe('Create from interval', () => {
        const testCases = [
            { from: 'C', interval: 'd1', expected: 'C♭' },
            { from: 'C', interval: 'P1', expected: 'C' },
            { from: 'C', interval: 'A1', expected: 'C♯' },
            { from: 'C', interval: 'd2', expected: 'D𝄫' },
            { from: 'C', interval: 'm2', expected: 'D♭' },
            { from: 'C', interval: 'M2', expected: 'D' },
            { from: 'C', interval: 'A2', expected: 'D♯' },
            { from: 'C', interval: 'd3', expected: 'E𝄫' },
            { from: 'C', interval: 'm3', expected: 'E♭' },
            { from: 'C', interval: 'M3', expected: 'E' },
            { from: 'C', interval: 'A3', expected: 'E♯' },
            { from: 'C', interval: 'd4', expected: 'F♭' },
            { from: 'C', interval: 'P4', expected: 'F' },
            { from: 'C', interval: 'A4', expected: 'F♯' },
            { from: 'C', interval: 'd5', expected: 'G♭' },
            { from: 'C', interval: 'P5', expected: 'G' },
            { from: 'C', interval: 'A5', expected: 'G♯' },
            { from: 'C', interval: 'd6', expected: 'A𝄫' },
            { from: 'C', interval: 'm6', expected: 'A♭' },
            { from: 'C', interval: 'M6', expected: 'A' },
            { from: 'C', interval: 'A6', expected: 'A♯' },
            { from: 'C', interval: 'd7', expected: 'B𝄫' },
            { from: 'C', interval: 'm7', expected: 'B♭' },
            { from: 'C', interval: 'M7', expected: 'B' },
            { from: 'C', interval: 'A7', expected: 'B♯' },
            { from: 'C', interval: 'd8', expected: 'C♭' },
            { from: 'C', interval: 'P8', expected: 'C' },
            { from: 'C', interval: 'A8', expected: 'C♯' },

            { from: 'C♯', interval: 'd1', expected: 'C' },
            { from: 'C♯', interval: 'P1', expected: 'C♯' },
            { from: 'C♯', interval: 'A1', expected: 'C𝄪' },
            { from: 'C♯', interval: 'd2', expected: 'D♭' },
            { from: 'C♯', interval: 'm2', expected: 'D' },
            { from: 'C♯', interval: 'M2', expected: 'D♯' },
            { from: 'C♯', interval: 'A2', expected: 'D𝄪' },
            { from: 'C♯', interval: 'd3', expected: 'E♭' },
            { from: 'C♯', interval: 'm3', expected: 'E' },
            { from: 'C♯', interval: 'M3', expected: 'E♯' },
            { from: 'C♯', interval: 'A3', expected: 'E𝄪' },
            { from: 'C♯', interval: 'd4', expected: 'F' },
            { from: 'C♯', interval: 'P4', expected: 'F♯' },
            { from: 'C♯', interval: 'A4', expected: 'F𝄪' },
            { from: 'C♯', interval: 'd5', expected: 'G' },
            { from: 'C♯', interval: 'P5', expected: 'G♯' },
            { from: 'C♯', interval: 'A5', expected: 'G𝄪' },
            { from: 'C♯', interval: 'd6', expected: 'A♭' },
            { from: 'C♯', interval: 'm6', expected: 'A' },
            { from: 'C♯', interval: 'M6', expected: 'A♯' },
            { from: 'C♯', interval: 'A6', expected: 'A𝄪' },
            { from: 'C♯', interval: 'd7', expected: 'B♭' },
            { from: 'C♯', interval: 'm7', expected: 'B' },
            { from: 'C♯', interval: 'M7', expected: 'B♯' },
            { from: 'C♯', interval: 'A7', expected: 'B𝄪' },
            { from: 'C♯', interval: 'd8', expected: 'C' },
            { from: 'C♯', interval: 'P8', expected: 'C♯' },
            { from: 'C♯', interval: 'A8', expected: 'C𝄪' },

            { from: 'B♭', interval: 'd1', expected: 'B𝄫' },
            { from: 'B♭', interval: 'P1', expected: 'B♭' },
            { from: 'B♭', interval: 'A1', expected: 'B' },
            { from: 'B♭', interval: 'd2', expected: 'C𝄫' },
            { from: 'B♭', interval: 'm2', expected: 'C♭' },
            { from: 'B♭', interval: 'M2', expected: 'C' },
            { from: 'B♭', interval: 'A2', expected: 'C♯' },
            { from: 'B♭', interval: 'd3', expected: 'D𝄫' },
            { from: 'B♭', interval: 'm3', expected: 'D♭' },
            { from: 'B♭', interval: 'M3', expected: 'D' },
            { from: 'B♭', interval: 'A3', expected: 'D♯' },
            { from: 'B♭', interval: 'd4', expected: 'E𝄫' },
            { from: 'B♭', interval: 'P4', expected: 'E♭' },
            { from: 'B♭', interval: 'A4', expected: 'E' },
            { from: 'B♭', interval: 'd5', expected: 'F♭' },
            { from: 'B♭', interval: 'P5', expected: 'F' },
            { from: 'B♭', interval: 'A5', expected: 'F♯' },
            { from: 'B♭', interval: 'd6', expected: 'G𝄫' },
            { from: 'B♭', interval: 'm6', expected: 'G♭' },
            { from: 'B♭', interval: 'M6', expected: 'G' },
            { from: 'B♭', interval: 'A6', expected: 'G♯' },
            { from: 'B♭', interval: 'd7', expected: 'A𝄫' },
            { from: 'B♭', interval: 'm7', expected: 'A♭' },
            { from: 'B♭', interval: 'M7', expected: 'A' },
            { from: 'B♭', interval: 'A7', expected: 'A♯' },
            { from: 'B♭', interval: 'd8', expected: 'B𝄫' },
            { from: 'B♭', interval: 'P8', expected: 'B♭' },
            { from: 'B♭', interval: 'A8', expected: 'B' },
        ];

        testCases.forEach(testCase => {
            it(`${testCase.interval} from ${testCase.from} should be ${testCase.expected}`, () => {
                const fromPitch = Pitch.fromString(testCase.from);
                const interval = Interval.fromString(testCase.interval);
                const toPitch = Pitch.fromInterval(fromPitch, interval);
                expect(toPitch.toString()).toBe(testCase.expected);
            });
        });
    });

});