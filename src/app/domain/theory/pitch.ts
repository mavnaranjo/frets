import { PitchName } from './pitch-name';
import { PitchAlteration, PitchAlterationRepresentation } from './pitch-alteration';

export class Pitch {
    readonly pitch: PitchName;
    readonly alteration: PitchAlteration;

    constructor(
        pitch: PitchName,
        alteration: PitchAlteration = PitchAlteration.NATURAL
    ) {
        this.pitch = pitch;
        this.alteration = alteration;
    }

    distance(other: Pitch) {
        return (other.pitch + other.alteration) - (this.pitch + this.alteration);
    }

    toString(): string {
        let pitchString = PitchName[this.pitch];
        if (this.alteration !== PitchAlteration.NATURAL) {
            const alterationKey = PitchAlteration[this.alteration] as keyof typeof PitchAlterationRepresentation;
            pitchString += PitchAlterationRepresentation[alterationKey];
        }
        return pitchString;
    }
}