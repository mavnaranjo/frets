import { Interval } from "../interval/interval";
import { Pitch } from "../pitch/pitch";
import { ChordType } from "./chord-type";

export default class Chord {
    readonly root: Pitch;
    readonly type: ChordType;
    readonly pitches: Pitch[];

    constructor(root: Pitch, type: ChordType) {
        this.root = root;
        this.type = type;
        this.pitches = Chord.pitches(root, type);
    }

    private static pitches(root: Pitch, type: ChordType): Pitch[] {
        let intervals = {
            [ChordType.MAJOR]: ['P1', 'M3', 'P5'],
            [ChordType.MINOR]: ['P1', 'm3', 'P5'],
            [ChordType.FIFTH]: ['P1', 'P5'],
        };

        return intervals[type].map((interval) => Pitch.fromInterval(root, Interval.fromString(interval)));
    }

    static fromString(chordString: string): Chord {
        const match = /^([A-G])(𝄫|♭|♮|♯|𝄪)?(M|m|5)?$/.exec(chordString);
        if (!match) {
            throw new Error(`Invalid chord string: ${chordString}`);
        }

        const pitch = Pitch.fromString(match[1] + (match[2] ?? ''));
        const chordType = (match[3] ?? 'M') as ChordType;

        return new Chord(pitch, chordType);
    }

    toString(): string {
        let chordString = this.root.toString();
        if (this.type !== ChordType.MAJOR) {
            chordString += this.type;
        }
        return chordString;
    }
}