import { PitchName } from './pitch-name';
import { PitchAlteration, PitchAlterationPresentation } from './pitch-alteration';

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

    static fromString(pitchString: string): Pitch {
        const match = /^([A-G])(♭♭|♭|♮|♯|♯♯)?$/.exec(pitchString);
        if (!match) {
            throw new Error(`Invalid pitch string: ${pitchString}`);
        }

        const pitchName = PitchName[match[1] as keyof typeof PitchName];

        const alterationString = (match[2] ?? '♮') as PitchAlterationPresentation;
        const alterationKey = Object.keys(PitchAlterationPresentation)[Object.values(PitchAlterationPresentation).indexOf(alterationString)];
        const pitchAlteration = PitchAlteration[alterationKey as keyof typeof PitchAlteration];

        return new Pitch(pitchName, pitchAlteration);
    }

    distance(other: Pitch) {
        return (other.pitch + other.alteration) - (this.pitch + this.alteration);
    }

    toString(): string {
        let pitchString = PitchName[this.pitch];
        if (this.alteration !== PitchAlteration.NATURAL) {
            const alterationKey = PitchAlteration[this.alteration] as keyof typeof PitchAlterationPresentation;
            pitchString += PitchAlterationPresentation[alterationKey];
        }
        return pitchString;
    }
}