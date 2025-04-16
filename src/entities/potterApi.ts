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

export const ColorHouses = {
  Gryffindor: {
    color: "#9C2A2A",
    backgroundColor: "#F7D1D1"
  },
  Hufflepuff: {
    color: "#E6B700",
    backgroundColor: "#F7F0D1"
  },
  Ravenclaw: {
    color: "#003DA5",
    backgroundColor: "#D1E3F7"
  },
  Slytherin: {
    color: "#4B8B3B",
    backgroundColor: "#D1F7E3"
  }
}