export interface Book {
  number:        number;
  title:         string;
  originalTitle: string;
  releaseDate:   string;
  description:   string;
  pages:         number;
  cover:         string;
  index:         number;
}

export interface Character {
  fullName:      string;
  nickname:      string;
  hogwartsHouse: HogwartsHouse;
  interpretedBy: string;
  children:      string[];
  image:         string;
  birthdate:     string;
  index:         number;
}

export interface House {
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

export interface Spell {
  spell: string;
  use:   string;
  index: number;
}

