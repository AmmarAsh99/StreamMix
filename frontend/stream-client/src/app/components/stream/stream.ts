import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StreamService } from '../../api/stream.service';

@Component({
  selector: 'app-stream',
  imports: [FormsModule],
  templateUrl: './stream.html',
  styleUrl: './stream.css',
})
export class Stream {
  constructor(private streamService: StreamService) {}
  videoUrl = '';
  videoSrc = signal<string | null>(null);
  loadVideo() {
    console.log(this.videoUrl);
    this.streamService.getVideo(this.videoUrl).subscribe({
      next: (value) => {
        const url = URL.createObjectURL(value);
        this.videoSrc.set(url);
        this.videoUrl = '';
      },
      error: async (err) => {
        if (err.error instanceof Blob) {
          const errorMessage = await err.error.text();
          const errorJson = JSON.parse(errorMessage);
          console.error('Custom Error Message:', errorJson.message);
        } else {
          console.error('Standard Error:', err.message);
        }
      },
    });
  }
}
