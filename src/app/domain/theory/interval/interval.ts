import { IntervalDistance } from "./interval-distance";
import { IntervalNumber } from "./interval-number";
import { IntervalQuality, IntervalQualityPresentation } from "./interval-quality";

export class Interval {
    readonly number: IntervalNumber;
    readonly quality: IntervalQuality;
    readonly distance: IntervalDistance;

    constructor(
        number: number,
        quality: IntervalQuality
    ) {
        Interval.checkInvalidPerfectIntervals(number, quality);
        Interval.checkInvalidMajorOrMinorIntervals(number, quality);

        this.number = number;
        this.quality = quality;
        this.distance = Interval.getDistance(number, quality);
    }

    private static perfectible(number: IntervalNumber): boolean {
        return [
            IntervalNumber.UNISON,
            IntervalNumber.FOURTH,
            IntervalNumber.FIFTH,
            IntervalNumber.OCTAVE
        ].includes(number);
    }

    private static checkInvalidPerfectIntervals(
        number: IntervalNumber,
        quality: IntervalQuality
    ) {
        if (
            !Interval.perfectible(number) &&
            quality == IntervalQuality.PERFECT
        ) {
            throw new Error(`Invalid interval`);
        }
    }

    private static checkInvalidMajorOrMinorIntervals(
        number: IntervalNumber,
        quality: IntervalQuality
    ) {
        if (
            Interval.perfectible(number) && (
                quality == IntervalQuality.MINOR ||
                quality == IntervalQuality.MAJOR
            )
        ) {
            throw new Error(`Invalid interval`);
        }
    }

    private static getDistance(number: IntervalNumber, quality: IntervalQuality): IntervalDistance {
        const numberKey = IntervalNumber[number] as keyof typeof IntervalNumber;
        const qualityKey = IntervalQuality[quality] as keyof typeof IntervalQuality;
        const distanceKey = qualityKey + '_' + numberKey as keyof typeof IntervalDistance;

        return IntervalDistance[distanceKey];
    }

    static fromString(intervalString: string): Interval {
        const match = /^(P|d|A|m|M)([1-8])$/.exec(intervalString);
        if (!match) {
            throw new Error(`Invalid interval string: ${intervalString}`);
        }

        const qualityString = match[1] as IntervalQualityPresentation;
        const qualityPresentationIndex = Object.values(IntervalQualityPresentation).indexOf(qualityString);
        const qualityKey = Object.keys(IntervalQualityPresentation)[qualityPresentationIndex] as keyof typeof IntervalQuality;
        const intervalQuality = IntervalQuality[qualityKey];

        const number = parseInt(match[2]) as IntervalNumber;
        
        return new Interval(number, intervalQuality);
    }

    toString(): string {
        const qualityKey = IntervalQuality[this.quality] as keyof typeof IntervalQualityPresentation;
        const qualityPresentation = IntervalQualityPresentation[qualityKey];

        return qualityPresentation + this.number;
    }   
}