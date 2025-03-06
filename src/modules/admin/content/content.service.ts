import { CATEGORY_CONTENT_STATUS, CONTENT_TYPE } from "../../../constants/content.constants";
import { toCategoryDto } from "../../../dtos/category.dto";
import { toContentDto, toListContentDtos } from "../../../dtos/content.dto";
import { CategoryContentModel } from "../../../models/category_content.model";
import { ContentModel } from "../../../models/content.model";
import { checkCategoryByCateid, checkCategoryByName, checkContentByConid, getAllCategory, getAllCategoryAndContent, getAllContents, saveCategory, saveContent, updateCategory } from "../../../repositories/content.repository";

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

export async function updateCategoryByCateid(cateId: string, body: any) {
  // check if category exists
  const category = await checkCategoryByCateid(cateId);

  if (!category) throw { status: 404, message: 'Category not found' };

  // check if category name already exists
  if(body.name){
    const categories = await checkCategoryByName([body.name]);
    if (categories.length) throw { status: 400, message: 'Category name already exists' };
  }

  const updated = {...category, ...body};

  const newCategory = await updateCategory(category, updated);

  return newCategory;
}

export async function getListCategoryForDropDown() {
  const categories = await getAllCategory();
  return categories.map(cat => toCategoryDto(cat));
}

export async function getAllCategoryStatistic(query: any){
  const { page = 1, perPage = 1000} = query;
  const result = await getAllCategoryAndContent(page, perPage);

  const categories = result[0];
  const total = result[1];

  // Count type of content in each category
  const countTypeOfContent: any = categories.map((cat) => {
    const typeArticle = cat.contents.filter((content) => content.typeOfContent === CONTENT_TYPE.ARTICLE).length;
    const typeVideo = cat.contents.filter((content) => content.typeOfContent === CONTENT_TYPE.VIDEO).length;
    const typeInfographic = cat.contents.filter((content) => content.typeOfContent === CONTENT_TYPE.INFOGRAPHIC).length;

    return {
      ID: cat.cateid,
      Name: cat.name,
      Article :typeArticle,
      Video: typeVideo,
      Infographic: typeInfographic,
      Status: cat.status
    };
  })

  return { categories: countTypeOfContent, total };
}

export async function createContent(body: any) {

  const {typeOfContent, video, images, categoryId} = body;

  if (typeOfContent === CONTENT_TYPE.ARTICLE && (video || images)) throw { status: 400, message: 'Article should not have video and images' };
  if (typeOfContent === CONTENT_TYPE.VIDEO && images) throw { status: 400, message: 'Video should not have images' };
  if (typeOfContent === CONTENT_TYPE.INFOGRAPHIC && video) throw { status: 400, message: 'Infographic should not have video' };

  // check if category exists
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

  const updated: Partial<ContentModel> = {
    ...content,
    ...others,
    requiredDays: requiredDays !== undefined && requiredDays !== null && requiredDays !== '' 
                  ? requiredDays * 30 
                  : content.requiredDays,
  };

  // check type of content,----- should i check here or not?
  if (typeOfContent) {
    if (typeOfContent === CONTENT_TYPE.ARTICLE) {
      if (video || images) throw { status: 400, message: 'Article should not have video and images' };
      updated.video = null;
      updated.images = null;
    }

    if (typeOfContent === CONTENT_TYPE.VIDEO) {
      if (images) throw { status: 400, message: 'Video should not have images' };
      updated.video = video ?? content.video;
      updated.images = null;
    }

    if (typeOfContent === CONTENT_TYPE.INFOGRAPHIC) {
      if (video) throw { status: 400, message: 'Infographic should not have video' };
      updated.images = images ?? content.images;
      updated.video = null;
    }
  }

  // check if categoryId exists so update it
  if (categoryId) {
    const category = await checkCategoryByCateid(categoryId);
    if (!category) throw { status: 404, message: 'Category not found' };
    updated.category = category;
  }

  const newContent = await saveContent(updated);

  return toContentDto(newContent);
}

export async function getListContent(query: any) {
  const { page = 1, perPage = 1000, filter = 'all'} = query;

  const result = await getAllContents(filter, page, perPage);

  const contents = result[0];
  const total = result[1];

  return { contents: toListContentDtos(contents), total };
}

