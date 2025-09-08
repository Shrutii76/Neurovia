export interface CandyItem {
  id: string;
  name: string;
  image: string;
  emoji: string;
}

export type GameState = 'instructions' | 'counting' | 'question' | 'result' | 'final';