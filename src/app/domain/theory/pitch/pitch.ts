import { PitchName } from './pitch-name';
import { PitchAlteration, PitchAlterationPresentation } from './pitch-alteration';
import { Interval } from '../interval/interval';

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
        const match = /^([A-G])(𝄫|♭|♮|♯|𝄪)?$/.exec(pitchString);
        if (!match) {
            throw new Error(`Invalid pitch string: ${pitchString}`);
        }

        const pitchName = PitchName[match[1] as keyof typeof PitchName];

        const alterationString = (match[2] ?? '♮') as PitchAlterationPresentation;
        const alterationIndex = Object.values(PitchAlterationPresentation).indexOf(alterationString);
        const alterationKey = Object.keys(PitchAlterationPresentation)[alterationIndex] as keyof typeof PitchAlteration;
        const pitchAlteration = PitchAlteration[alterationKey];

        return new Pitch(pitchName, pitchAlteration);
    }

    static fromInterval(from: Pitch, interval: Interval): Pitch {
        const pitchNameKeys = Object.keys(PitchName).filter(key => isNaN(Number(key)));

        const fromPitchKey = PitchName[from.pitch] as keyof typeof PitchName;
        const fromPitchIndex = pitchNameKeys.indexOf(fromPitchKey);

        const pitchIndex = (fromPitchIndex + interval.number - 1) % pitchNameKeys.length;
        const pitchKey = pitchNameKeys[pitchIndex] as keyof typeof PitchName;
        const pitchName = PitchName[pitchKey];

        const pitch = new Pitch(pitchName);

        let alterationDistance = interval.distance - from.distance(pitch);
        if (alterationDistance > PitchAlteration.DOUBLE_SHARP) {
            alterationDistance -= 12;
        }
        const alterationValue = (alterationDistance % 12) as PitchAlteration;
        const alterationKey = PitchAlteration[alterationValue] as keyof typeof PitchAlteration;
        const alteration = PitchAlteration[alterationKey];

        return new Pitch(pitchName, alteration);
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