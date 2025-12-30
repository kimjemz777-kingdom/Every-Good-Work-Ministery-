export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface Devotional {
  title: string;
  scripture: string;
  content: string;
}

export enum Page {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  MINISTRIES = 'MINISTRIES',
  CONTACT = 'CONTACT'
}
