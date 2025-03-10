import { Interval } from "../interval/interval";
import { Pitch } from "../pitch/pitch";
import { ScaleType } from "./scale-type";

export default class Scale {
    readonly tonic: Pitch;
    readonly type: ScaleType;
    readonly degrees: Pitch[];

    constructor(tonic: Pitch, type: ScaleType) {
        this.tonic = tonic;
        this.type = type;
        this.degrees = Scale.degrees(tonic, type);
    }

    private static degrees(tonic: Pitch, type: ScaleType): Pitch[] {
        let intervals = {
            [ScaleType.MAJOR]: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'],
            [ScaleType.MINOR]: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'],
        };

        return intervals[type].map((interval) => Pitch.fromInterval(tonic, Interval.fromString(interval)));
    }
}