import { dataSource } from "../data-source";
import { ArtJournal } from "../models/art_journal.model";

export async function checkArtNameExits(name: string) {
  const artRepository = dataSource.getRepository(ArtJournal);
  return await artRepository.findOne({
    where: { name },
  });
}

export async function getArtById(aid: string) {
  const artRepository = dataSource.getRepository(ArtJournal);
  return await artRepository.findOne({
    where: { aid },
    relations: ['userSubmisArts'],
  });
}

export async function saveArt(data: Partial<ArtJournal>) {
  const artRepository = dataSource.getRepository(ArtJournal);
  const newArt = artRepository.create(data);
  await artRepository.save(newArt);
  return newArt;
}

export const updateArtJournal = async (art: ArtJournal, data: Partial<ArtJournal>) => {
  const artRepository = dataSource.getRepository(ArtJournal);

  await artRepository.update(art.aid, data);

  return { ...art, ...data };
};