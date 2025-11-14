import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const video = this.videoPlayer.nativeElement;
    
    // Ensure video is muted (required for autoplay)
    video.muted = true;
    
    // Add event listeners to handle loading
    video.addEventListener('loadedmetadata', () => {
      console.log('Video metadata loaded');
      video.play().catch(err => {
        console.error('Error playing video:', err);
      });
    });

    video.addEventListener('error', (e) => {
      console.error('Video error:', video.error);
    });
  }
}
