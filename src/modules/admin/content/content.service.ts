import { CATEGORY_CONTENT_STATUS, CONTENT_TYPE } from "../../../constants/content.constants";
import { toContentDto } from "../../../dtos/content.dto";
import { CategoryContentModel } from "../../../models/category_content.model";
import { ContentModel } from "../../../models/content.model";
import { checkCategoryByCateid, checkCategoryByName, checkContentByConid, saveCategory, saveContent, updateCategory } from "../../../repositories/content.repository";

export async function createListCategory(listCat: Partial<CategoryContentModel>[]) {

  // check duplicate category name in request
  const names = listCat.map(cat => cat.name);
  const duplicateNames = names.filter((name, index) => names.indexOf(name) !== index);
  if (duplicateNames.length) {
    throw {
      status: 400,
      message: 'Duplicate category name(s) in request',
      details: [...new Set(duplicateNames)].map(name => ({
        path: 'name',
        message: `${name} is duplicated in request`
      }))
    };
  }

  // check duplicate category name in database
  const categories = await checkCategoryByName(listCat.map(cat => cat.name));
  if (categories.length > 0) {
    throw {
      status: 400,
      message: 'Category name(s) already exist in database',
      details: categories.map((cat) => {
        return {
          path: 'name',
          message: `${cat.name} already exists in database`
        };
      })
    };
  }
  const newCategories = listCat.map(cat => ({...cat, status: CATEGORY_CONTENT_STATUS.ACTIVE}));

  const result = await saveCategory(newCategories);

  return result;
}

export async function createContent(body: any) {

  const {typeOfContent, video, images, categoryId} = body;

  if (typeOfContent === CONTENT_TYPE.ARTICLE && (video || images)) throw { status: 400, message: 'Article should not have video and images' };
  if (typeOfContent === CONTENT_TYPE.VIDEO && images) throw { status: 400, message: 'Video should not have images' };
  if (typeOfContent === CONTENT_TYPE.INFOGRAPHIC && video) throw { status: 400, message: 'Infographic should not have video' };

  const category = await checkCategoryByCateid(categoryId);

  if (!category) throw { status: 404, message: 'Category not found' };

  const newContent = await saveContent({
    ...body,
    category,
    requiredDays: body.requiredDays * 30
  });

  return toContentDto(newContent);
}

export async function updateContentByConId(conId: string, body: any) {
  // check if content exists
  const content = await checkContentByConid(conId);
  if (!content) throw { status: 404, message: 'Content not found' };

  const {typeOfContent, video, images, categoryId, requiredDays, ...others} = body;

  if (typeOfContent === CONTENT_TYPE.ARTICLE && (video || images)) throw { status: 400, message: 'Article should not have video and images' };
  if (typeOfContent === CONTENT_TYPE.VIDEO && images) throw { status: 400, message: 'Video should not have images' };
  if (typeOfContent === CONTENT_TYPE.INFOGRAPHIC && video) throw { status: 400, message: 'Infographic should not have video' };

  const updated: Partial<ContentModel> = {
      ...content,
      ...others,
      typeOfContent: typeOfContent ?? content.typeOfContent,
      requiredDays: requiredDays !== undefined && requiredDays !== null && requiredDays !== '' ? requiredDays * 30 : content.requiredDays,
  };

  if (categoryId) {
    const category = await checkCategoryByCateid(categoryId);
    if (!category) throw { status: 404, message: 'Category not found' };
    updated.category = category;
  }

  const newContent = await saveContent(updated);

  return toContentDto(newContent);
}

export async function updateCategoryByCateid(cateId: string, body: any) {
  const category = await checkCategoryByCateid(cateId);

  if (!category) throw { status: 404, message: 'Category not found' };

  if(body.name){
    const categories = await checkCategoryByName([body.name]);
    if (categories.length) throw { status: 400, message: 'Category name already exists' };
  }

  const updated = {...category, ...body};

  const newCategory = await updateCategory(category, updated);

  return newCategory;
}