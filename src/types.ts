export interface PersonalisationState {
  name: string;
  pronunciation?: string;
  pronouns?: "Name" | "he/him" | "she/her" | "they/them";
  age: string;
  interest: string;
  goal: string;
  value: string;
  avatar: {
    skinTone: string;
    hairStyle: string;
    accessory: string;
    companionPet: string;
    color: string;
  };
}

export type MusicTheme = "chimes" | "marimba" | "lullaby" | "arcade";

export interface GameScore {
  gameId: string;
  score: number;
  stars: number;
  highestStreak: number;
}

export interface GeneratedSong {
  verses: string[];
  chorus: string[];
}

export interface StoryPage {
  pageNumber: number;
  sceneTitle: string;
  illustrationEmoji: string;
  secondaryEmojis: string[];
  text: string;
  characterDialogue: string;
  moralChoice?: {
    prompt: string;
    optionA: { label: string; outcome: string; bonusValue: string };
    optionB: { label: string; outcome: string; bonusValue: string };
  };
}

export interface GeneratedStory {
  title: string;
  childName: string;
  pronunciation?: string;
  theme: string;
  moralValue: string;
  song: GeneratedSong;
  lyrics: string[];
  pages: StoryPage[];
  celebrationBadge: string;
  superpowerTitle: string;
}

export interface TriviaQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  funFact: string;
  emoji: string;
}

export interface WordPuzzle {
  word: string;
  hint: string;
  emoji: string;
  category: string;
  fact: string;
}

export interface MathChallenge {
  num1: number;
  num2: number;
  operator: "+" | "-" | "×";
  answer: number;
  options: number[];
  storyContext: string;
}
