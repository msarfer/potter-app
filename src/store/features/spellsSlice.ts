// spellsSlice.ts
import { SpellInterface } from "@/entities/potterApi";
import { createEntitySlice } from "./createEntitySlice";

const {
  reducer: spellsReducer,
  fetchEntities: fetchSpells,
  fetchEntitiesFavs: fetchSpellsFavs,
  updateEntitiesFavs: updateSpellsFavs,
} = createEntitySlice<SpellInterface>("spells", "spells");

export { fetchSpells, fetchSpellsFavs, updateSpellsFavs };
export default spellsReducer;