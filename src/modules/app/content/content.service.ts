import { toContentDto } from "../../../dtos/content.dto";
import { checkContentExits, getContentByConid, saveUserViewContent } from "../../../repositories/content.repository";
import { getUserByUid } from "../../../repositories/user.repository";
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