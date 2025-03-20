import { toArtJournalDTO, toListArtJournalDTO } from "../../../dtos/art_journal.dto";
import { toListUserArtForAdminDTO, toUserArtDTO, toUserArtForAdminDTO } from "../../../dtos/user_art.dto";
import { ArtJournal } from "../../../models/art_journal.model";
import { checkArtNameExits, getAllArtJournal, getArtById, getMostPopularTopic, getMostPopularTopicThisWeek, getSubmissionByUaid, getTotalSubmissions, getTotalSubmissionsThisWeek, getUserSubmissionsByArtAid, saveArt, updateArtJournal } from "../../../repositories/art_journal.repository";
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

export async function updatedArt(aid: string, body: any) {
  const artJournal = await getArtById(aid);

  if (!artJournal) {
    throw new ApiError({ message: 'Art Journal not found!', status: 404, data: null });
  }
  
  if (body.name && body.name !== artJournal.name) {
    const art = await checkArtNameExits([body.name], aid);
    if (art.length) {
      throw new ApiError({ message: 'Art Journal name already exists!', status: 400, data: null });
    }
  }

  const updatedData = {
    name: body.name || artJournal.name,
    status: body.status || artJournal.status,
    point: body.point ?? artJournal.point,
    isDrawCircle: body.isDrawCircle ?? artJournal.isDrawCircle,
    description: body.description ?? artJournal.description,
    banner: body.banner ?? artJournal.banner,
  };

  const newArt = await updateArtJournal(aid, updatedData);
  return newArt;
}

export async function getListArtJournals(query: any) {
  const {page = 1, perPage = 1000} = query;

  const result = await getAllArtJournal(page, perPage);
  const artJournals = result[0];
  const total = result[1];

  return { data: toListArtJournalDTO(artJournals), total}
}

export async function getStatisticsSubmitAndTopic() {
  const totalSubmissions = await getTotalSubmissions();
  const totalSubmissionsThisWeek = await getTotalSubmissionsThisWeek();
  const popularTopic = await getMostPopularTopic();
  const popularTopicThisWeek = await getMostPopularTopicThisWeek();

  return {
    TotalSubmissions: totalSubmissions,
    TotalSubmissionsThisWeek :totalSubmissionsThisWeek,
    PopularTopic: popularTopic,
    PopularTopicThisWeek: popularTopicThisWeek,
  }
}

export async function getArtJournal(aid: string) {
  const artJournal = await getArtById(aid);

  if (!artJournal) {
    throw new ApiError({ message: 'Art Journal not found!', status: 404, data: null });
  }

  const userSubmissions = await getUserSubmissionsByArtAid(aid);

  return { ...toArtJournalDTO(artJournal), userSubmissions: toListUserArtForAdminDTO(userSubmissions) };
}

export async function getSubmission(uaid: string) {
  const artJournal = await getSubmissionByUaid(uaid);

  if (!artJournal) {
    throw new ApiError({ message: 'Submission not found!', status: 404, data: null });
  }

  return toUserArtForAdminDTO(artJournal);
}

