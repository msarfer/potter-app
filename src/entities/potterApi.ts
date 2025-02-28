export interface BookInterface {
  number:        number;
  title:         string;
  originalTitle: string;
  releaseDate:   string;
  description:   string;
  pages:         number;
  cover:         string;
  index:         number;
}

export interface CharacterInterface {
  fullName:      string;
  nickname:      string;
  hogwartsHouse: HogwartsHouse;
  interpretedBy: string;
  children:      string[];
  image:         string;
  birthdate:     string;
  index:         number;
}

export interface HouseInterface {
  house:   HogwartsHouse;
  emoji:   string;
  founder: string;
  colors:  string[];
  animal:  string;
  index:   number;
}

export enum HogwartsHouse {
  GRYFFINDOR = "Gryffindor",
  HUFFLEPUFF = "Hufflepuff",
  RAVENCLAW = "Ravenclaw",
  SLYTHERIN = "Slytherin",
}

export interface SpellInterface {
  spell: string;
  use:   string;
  index: number;
}

