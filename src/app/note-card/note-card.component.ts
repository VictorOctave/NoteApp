import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() title: string;
  @Input() body: string;

  @ViewChild('truncator') truncator: ElementRef<HTMLElement>;
  @ViewChild('bodytext') bodytext: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    // work out if there is a text overflow and if not, then hide the truncator
    
    let style = window.getComputedStyle(this.bodytext.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10);

    if (this.bodytext.nativeElement.scrollHeight > viewableHeight) {
      // if there is no text overflow, show the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      // hide the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }

}
