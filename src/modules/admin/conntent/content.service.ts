import { CATEGORY_CONTENT_STATUS } from "../../../constants/content.constants";
import { toContentDto } from "../../../dtos/content.dto";
import { CategoryContentModel } from "../../../models/category_content.model";
import { checkCategoryByName, saveCategory, saveContent } from "../../../repositories/content.repository";

export async function createContent(adminId: string, body: any) {

  const {typeOfContent, video, images} = body;

  if (typeOfContent === 'article' && (video || images)) throw { status: 400, message: 'Article should not have video and images' };
  if (typeOfContent === 'video' && images) throw { status: 400, message: 'Video should not have images' };
  if (typeOfContent === 'infographic' && video) throw { status: 400, message: 'Infographic should not have video' };

  const newContent = await saveContent({
    ...body, 
    requiredMonths: body.requiredMonths * 30,
    createdBy: adminId,
  });

  return toContentDto(newContent);
}

export async function createListCategory(adminId: string, listCat: Partial<CategoryContentModel>[]) {
  const categories = await checkCategoryByName(listCat.map(cat => cat.name));
  if (categories.length) throw { status: 400, message: 'Category name already exists' };

  const newCategories = listCat.map(cat => ({...cat, status: CATEGORY_CONTENT_STATUS.ACTIVE, createdBy: adminId}));

  const result = await saveCategory(newCategories);

  return result;
}