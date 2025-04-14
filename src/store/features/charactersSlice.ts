// spellsSlice.ts
import { CharacterInterface } from "@/entities/potterApi";
import { createEntitySlice } from "./createEntitySlice";

const {
  reducer: charactersReducer,
  fetchEntities: fetchCharacters,
  fetchEntitiesFavs: fetchCharactersFavs,
  updateEntitiesFavs: updateCharactersFavs,
} = createEntitySlice<CharacterInterface>("characters", "characters");

export { fetchCharacters, fetchCharactersFavs, updateCharactersFavs };
export default charactersReducer;