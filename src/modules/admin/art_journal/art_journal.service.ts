import { toArtJournalDTO } from "../../../dtos/art_journal.dto";
import { ArtJournal } from "../../../models/art_journal.model";
import { checkArtNameExits, getArtById, saveArt, updateArtJournal } from "../../../repositories/art_journal.repository";
import { ApiError } from "../../../utils/apiError";

export async function createdArt(body: any) {
  const { name } = body;
  const art = await checkArtNameExits(name);

  if (art) {
    throw new ApiError({ message: 'Art Journal is aready exits!', status: 400, data: null});
  }

  const newArt = await saveArt(body);

  return toArtJournalDTO(newArt);
}

export async function updatedArt(aid: string, body: Partial<ArtJournal>) {
  const artJournal = await getArtById(aid);

  if (!artJournal) {
    throw new ApiError({ message: 'Art Journal not found!', status: 404, data: null });
  }

  await updateArtJournal(artJournal, body);

  return toArtJournalDTO(artJournal);
}