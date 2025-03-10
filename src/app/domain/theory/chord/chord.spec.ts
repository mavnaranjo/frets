import { Pitch } from "../pitch/pitch";
import Chord from "./chord";
import { ChordType } from "./chord-type";

describe('Chord', () => {
    it('should instance' , () => {
        const chord = new Chord(Pitch.fromString('C'), ChordType.MAJOR);
        expect(chord).toBeTruthy();
    });

    describe('Presentation', () => {
        const testCases = ['C', 'Dm', 'E5', 'F♯', 'G♭m', 'A𝄪5', 'B𝄫'];

        testCases.forEach(chordString => {
            it(`${chordString} to be displayed properly`, () => {
                const chord = Chord.fromString(chordString);
                expect(chord.toString()).toBe(chordString);
            });
        });
    });

    describe('Chord pitches', () => {
        const testCases = [
            { chord: 'C', pitches: ['C', 'E', 'G'] },
            { chord: 'Cm', pitches: ['C', 'E♭', 'G'] },
            { chord: 'C5', pitches: ['C', 'G'] },
            { chord: 'C♯', pitches: ['C♯', 'E♯', 'G♯'] },
            { chord: 'C♯m', pitches: ['C♯', 'E', 'G♯'] },
            { chord: 'C♯5', pitches: ['C♯', 'G♯'] },
            { chord: 'D♭', pitches: ['D♭', 'F', 'A♭'] },
            { chord: 'D♭m', pitches: ['D♭', 'F♭', 'A♭'] },
            { chord: 'D♭5', pitches: ['D♭', 'A♭'] },
            { chord: 'D', pitches: ['D', 'F♯', 'A'] },
            { chord: 'Dm', pitches: ['D', 'F', 'A'] },
            { chord: 'D5', pitches: ['D', 'A'] },
            { chord: 'E', pitches: ['E', 'G♯', 'B'] },
            { chord: 'Em', pitches: ['E', 'G', 'B'] },
            { chord: 'E5', pitches: ['E', 'B'] },
            { chord: 'F', pitches: ['F', 'A', 'C'] },
            { chord: 'Fm', pitches: ['F', 'A♭', 'C'] },
            { chord: 'F5', pitches: ['F', 'C'] },
            { chord: 'G', pitches: ['G', 'B', 'D'] },
            { chord: 'Gm', pitches: ['G', 'B♭', 'D'] },
            { chord: 'G5', pitches: ['G', 'D'] },
            { chord: 'A', pitches: ['A', 'C♯', 'E'] },
            { chord: 'Am', pitches: ['A', 'C', 'E'] },
            { chord: 'A5', pitches: ['A', 'E'] },
            { chord: 'B', pitches: ['B', 'D♯', 'F♯'] },
            { chord: 'Bm', pitches: ['B', 'D', 'F♯'] },
            { chord: 'B5', pitches: ['B', 'F♯'] },
        ];

        testCases.forEach(testCase => {
            it(`${testCase.chord} should contain ${testCase.pitches.join(', ')}`, () => {
                const chord = Chord.fromString(testCase.chord);
                const pitches = testCase.pitches.map(pitch => Pitch.fromString(pitch));
                expect(chord.pitches).toEqual(pitches);
            });
        });
    });
});