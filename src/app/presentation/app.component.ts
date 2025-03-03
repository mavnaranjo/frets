import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AbsolutePitch } from '../domain/theory/pitch/absolute-pitch';
import { Pitch } from '../domain/theory/pitch/pitch';
import { PitchName } from '../domain/theory/pitch/pitch-name';
import { PitchAlteration } from '../domain/theory/pitch/pitch-alteration';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frets';
  pitches = [
    new AbsolutePitch(new Pitch(PitchName.A)),
    new AbsolutePitch(new Pitch(PitchName.B, PitchAlteration.FLAT)),
    new AbsolutePitch(new Pitch(PitchName.C, PitchAlteration.SHARP), 5),
    new AbsolutePitch(new Pitch(PitchName.D, PitchAlteration.FLAT), 3),
    new AbsolutePitch(new Pitch(PitchName.E), 2),
    new AbsolutePitch(new Pitch(PitchName.F, PitchAlteration.SHARP), 1),
    new AbsolutePitch(new Pitch(PitchName.G), 6)
  ]
}
