import { Between, In, Not } from "typeorm";
import { dataSource } from "../data-source";
import { ArtJournal } from "../models/art_journal.model";
import { UserSubmisArtModel } from "../models/user_submis_art.model";
import { SUBMISSION_STATUS } from "../constants/art_journal.constants";

export async function checkArtNameExits(name: string[], aid?: string) {
  const artRepository = dataSource.getRepository(ArtJournal);
  const where = aid ? {name: In(name), aid: Not(aid) } : { name: In(name) };
  const artJournal = await artRepository.find({ where });
  return artJournal;
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

export async function updateArtJournal (aid: string, data: Partial<ArtJournal>){
  const artRepository = dataSource.getRepository(ArtJournal);

  await artRepository.update(aid, data);

  return await artRepository.findOne({ where: { aid } });
};

export async function getAllArtJournal(page: number, perPage: number) {
  const artRepository = dataSource.getRepository(ArtJournal);
  const result = await artRepository.findAndCount({
    order: { createdAt: 'DESC' },
    take: perPage,
    skip: (page - 1) * perPage,
    relations: ['userSubmisArts'],
  });
  return result;
}

export async function getUserSubmissionsByArtAid(aid: string) {
  const userSubmisRepository = dataSource.getRepository(UserSubmisArtModel);
  return await userSubmisRepository.find({
    where: { aid },
    relations: ['user'],
    order: {submissionDate: 'DESC'},
  })
}

export async function saveSubmissionArt(data: Partial<UserSubmisArtModel>) {
  const userSubmisRepository = dataSource.getRepository(UserSubmisArtModel);
  const newSubmission = userSubmisRepository.create(data);
  await userSubmisRepository.save(newSubmission);
  return newSubmission;
}

export async function getSubmissionByUaid(uaid: string) {
  const userSubmisRepository = dataSource.getRepository(UserSubmisArtModel);
  return await userSubmisRepository.findOne({
    where: { uaid },
    relations: ['user'],
  });
}

/*---------------------- STATISTICS ------------------ */

export async function getTotalSubmissions() {
  const submissionRepository = dataSource.getRepository(UserSubmisArtModel);
  return await submissionRepository.count({
    where: { status: SUBMISSION_STATUS.COMPLETE}
  });
}

export async function getTotalSubmissionsThisWeek(): Promise<number> {
  const submissionRepository = dataSource.getRepository(UserSubmisArtModel);
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  return await submissionRepository.count({
    where: {
      status: SUBMISSION_STATUS.COMPLETE,
      submissionDate: Between(startOfWeek, new Date()),
    },
  });
}

export async function getMostPopularTopic(): Promise<string | null> {
  const submissionRepository = dataSource.getRepository(UserSubmisArtModel);
  const result = await submissionRepository
    .createQueryBuilder('user_submis_art')
    .innerJoin('user_submis_art.artJournal', 'art_journal')
    .select('art_journal.name', 'topic')
    .addSelect('COUNT(user_submis_art.uaid)', 'count')
    .where('user_submis_art.status = :status', { status: SUBMISSION_STATUS.COMPLETE })
    .groupBy('art_journal.name')
    .orderBy('count', 'DESC')
    .addOrderBy('art_journal.name', 'ASC')
    .limit(1)
    .getRawMany();

  return result ? result[0].topic : null;
}

export async function getMostPopularTopicThisWeek(): Promise<string | null> {
  const submissionRepository = dataSource.getRepository(UserSubmisArtModel);
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const result = await submissionRepository
    .createQueryBuilder('user_submis_art')
    .innerJoin('user_submis_art.artJournal', 'art_journal')
    .select('art_journal.name', 'topic')
    .addSelect('COUNT(user_submis_art.uaid)', 'count')
    .where('user_submis_art.status = :status', { status: SUBMISSION_STATUS.COMPLETE })
    .andWhere('user_submis_art.submissionDate >= :startOfWeek', { startOfWeek })
    .groupBy('art_journal.name')
    .orderBy('count', 'DESC')
    .addOrderBy('art_journal.name', 'ASC')
    .limit(1)
    .getRawMany();

  return result ? result[0].topic : null;
}