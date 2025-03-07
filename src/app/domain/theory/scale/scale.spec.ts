import { Pitch } from "../pitch/pitch";
import Scale from "./scale";
import { ScaleType } from "./scale-type";

describe('Scale', () => {
    const testCases = [
        { tonic: 'C', type: ScaleType.MAJOR, expected: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] },
        { tonic: 'C♯', type: ScaleType.MAJOR, expected: ['C♯', 'D♯', 'E♯', 'F♯', 'G♯', 'A♯', 'B♯'] },
        { tonic: 'D♭', type: ScaleType.MAJOR, expected: ['D♭', 'E♭', 'F', 'G♭', 'A♭', 'B♭', 'C'] },
        { tonic: 'D', type: ScaleType.MAJOR, expected: ['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯'] },
        { tonic: 'D♯', type: ScaleType.MAJOR, expected: ['D♯', 'E♯', 'F𝄪', 'G♯', 'A♯', 'B♯', 'C𝄪'] },
        { tonic: 'E' , type: ScaleType.MAJOR, expected: ['E', 'F♯', 'G♯', 'A', 'B', 'C♯', 'D♯'] },
        { tonic: 'F' , type: ScaleType.MAJOR, expected: ['F', 'G', 'A', 'B♭', 'C', 'D', 'E'] },
        { tonic: 'G' , type: ScaleType.MAJOR, expected: ['G', 'A', 'B', 'C', 'D', 'E', 'F♯'] },
        { tonic: 'A' , type: ScaleType.MAJOR, expected: ['A', 'B', 'C♯', 'D', 'E', 'F♯', 'G♯'] },
        { tonic: 'B' , type: ScaleType.MAJOR, expected: ['B', 'C♯', 'D♯', 'E', 'F♯', 'G♯', 'A♯'] },

        { tonic: 'C', type: ScaleType.MINOR, expected: ['C', 'D', 'E♭', 'F', 'G', 'A♭', 'B♭'] },
        { tonic: 'D' , type: ScaleType.MINOR, expected: ['D', 'E', 'F', 'G', 'A', 'B♭', 'C'] },
        { tonic: 'E' , type: ScaleType.MINOR, expected: ['E', 'F♯', 'G', 'A', 'B', 'C', 'D'] },
        { tonic: 'F' , type: ScaleType.MINOR, expected: ['F', 'G', 'A♭', 'B♭', 'C', 'D♭', 'E♭'] },
        { tonic: 'G' , type: ScaleType.MINOR, expected: ['G', 'A', 'B♭', 'C', 'D', 'E♭', 'F'] },
        { tonic: 'A' , type: ScaleType.MINOR, expected: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
        { tonic: 'B' , type: ScaleType.MINOR, expected: ['B', 'C♯', 'D', 'E', 'F♯', 'G', 'A'] },
    ];

    testCases.forEach(({ tonic, type, expected }) => {
        it(`${tonic} ${type} scale should contain ${expected.join(', ')}`, () => {
            const scale = new Scale(Pitch.fromString(tonic), type);
            const degrees = expected.map(pitch => Pitch.fromString(pitch));
            expect(scale.degrees).toEqual(degrees);
        });
    });
});