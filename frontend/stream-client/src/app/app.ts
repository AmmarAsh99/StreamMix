import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Stream } from './components/stream/stream';

@Component({
  selector: 'app-root',
  imports: [Stream],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('stream-client');
}
