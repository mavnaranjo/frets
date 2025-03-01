import { Pitch } from "./pitch";
import { PitchName } from "./pitch-name";

export class AbsolutePitch { 
    readonly pitch: Pitch;
    readonly octave: number;

    constructor(pitch: Pitch, octave: number = 4) {
        this.pitch = pitch;
        this.octave = octave;
    }

    static fromString(pitchString: string): AbsolutePitch {
        const match = /^([A-G])(♭♭|♭|♮|♯|♯♯)?([0-9])?$/.exec(pitchString);
        if (!match) {
            throw new Error(`Invalid absolute pitch string: ${pitchString}`);
        }

        const pitch = Pitch.fromString(match[1] + (match[2] ?? ''));
        const octave = parseInt(match[3] ?? '4');

        return new AbsolutePitch(pitch, octave);
    }

    distance(other: AbsolutePitch): number {
        return this.pitch.distance(other.pitch) + 12 * (other.octave - this.octave);
    }

    frequency(baseTuning: number = 440): number {
        const distance = this.distance(new AbsolutePitch(new Pitch(PitchName.A)));
        // Equal temperament
        return baseTuning * Math.pow(2, - distance / 12);
    }

    toString(): string {
        return this.pitch.toString() + this.octave;
    }
}
