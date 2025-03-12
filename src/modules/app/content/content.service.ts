import { toContentDto, toListContentDto, toListContentShortDto } from "../../../dtos/content.dto";
import { checkContentExits, getContentAllowedSeen, getContentByConid, saveUserViewContent } from "../../../repositories/content.repository";
import { ApiError } from "../../../utils/apiError";

export async function getContentDetail(conid: string) {
  const content = await getContentByConid(conid);

  if (!content) {
    throw new ApiError({ message: 'Content not found', status: 404, data: null})
  }

  return toContentDto(content);
}

export async function userViewContent(conid: string, user: any) {
  const {uid} = user; 

  const content = await checkContentExits(conid);

  if (!content) throw new ApiError({message: 'Content not found', status: 404, data: null})

  await saveUserViewContent(conid, uid);

  return true;
}

export async function getListContentBelongToUser(user: any, query: any) {
  const {filter = 'all', page = 1, perPage = 1000 } = query;
  const {uid} = user;

  const result = await getContentAllowedSeen(uid, filter, page, perPage);

  const contents = result[0];
  const total = result[1];

  return {contents: toListContentShortDto(contents), total };
}