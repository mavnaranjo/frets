import { Pitch } from "./pitch";
import { PitchName } from "./pitch-name";

export class AbsolutePitch { 
    readonly pitch: Pitch;
    readonly octave: number;

    constructor(pitch: Pitch, octave: number = 4) {
        this.pitch = pitch;
        this.octave = octave;
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
