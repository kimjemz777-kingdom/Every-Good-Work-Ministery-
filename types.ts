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

export interface BibleVerse {
  verse: number;
  text: string;
}

export interface BibleChapter {
  reference: string;
  version: string;
  language: string;
  verses: BibleVerse[];
}

export enum Page {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  MINISTRIES = 'MINISTRIES',
  CONTACT = 'CONTACT'
}