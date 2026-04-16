import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit, OnDestroy } from '@angular/core';
import { AavaAvatarsComponent } from '../avatars/aava-avatars.component';
import { AavaIconComponent } from '../icon/aava-icon.component';
import { CommonModule } from '@angular/common';

interface Message {
  sender: 'user' | 'ai';
  senderName: string;
  time: string;
  text: string;
  avatar: string;
  icons: { name: string; label: string }[];
}

@Component({
  selector: 'aava-chat-bubble',
  standalone: true,
  imports: [AavaAvatarsComponent, AavaIconComponent, CommonModule],
  templateUrl: './aava-chat-bubble.component.html',
  styleUrl: './aava-chat-bubble.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaChatBubbleComponent implements OnInit, OnDestroy {
  @Input() messages: Message[] = [];
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';


  avatarSize: 'xxs' | 'md' = 'md';

  ngOnInit() {
    this.updateAvatarSize(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateAvatarSize(event.target.innerWidth);
  }

  private updateAvatarSize(width: number) {
    if (width <= 1024) {
      this.avatarSize = 'xxs';
    } else {
      this.avatarSize = 'md';
    }
  }

  copyMessage(text: string) {
    navigator.clipboard.writeText(text).then(() => { });
  }

  reactToMessage(reaction: 'like' | 'dislike') {

  }

  replyToMessage() {

  }

  speakMessage(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text?.trim()) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }

  ngOnDestroy(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    if (synth.speaking || synth.pending) {
      synth.cancel();
    }
  }
}
