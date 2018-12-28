import { Session } from './session';
import { Character } from './character';

export class Campaign {
  public id: string;
  public name: string;
  public description: string;

  public sessions: Session[];
  public characters: Character[];
}
