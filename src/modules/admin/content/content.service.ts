import { CATEGORY_CONTENT_STATUS, CONTENT_TYPE } from "../../../constants/content.constants";
import { toCategoryDto } from "../../../dtos/category.dto";
import { toContentDto } from "../../../dtos/content.dto";
import { CategoryContentModel } from "../../../models/category_content.model";
import { ContentModel } from "../../../models/content.model";
import { checkCategoryByCateid, checkCategoryByName, checkContentByConid, getAllCategory, getAllCategoryAndContent, getAllContents, saveCategory, saveContent, updateCategory } from "../../../repositories/content.repository";
import { ApiError } from "../../../utils/apiError";

export async function createListCategory(listCat: Partial<CategoryContentModel>[]) {

  // check duplicate category name in request
  const names = listCat.map(cat => cat.name);
  const duplicateNames = names.filter((name, index) => names.indexOf(name) !== index);
  if (duplicateNames.length) {
    throw new ApiError({
      message: 'Duplicate category name(s) in request' , 
      status: 400 , 
      data: null
    });
  }

  // check duplicate category name in database
  const categories = await checkCategoryByName(listCat.map(cat => cat.name));
  if (categories.length > 0) {
    throw new ApiError({
      message: 'Category name(s) already exist in database' , 
      status: 400 ,
      data: null
    });
  }
  const newCategories = listCat.map(cat => ({...cat, status: CATEGORY_CONTENT_STATUS.ACTIVE}));

  const result = await saveCategory(newCategories);

  return result;
}

export async function updateCategoryByCateid(cateId: string, body: any) {
  // check if category exists
  const category = await checkCategoryByCateid(cateId);

  if (!category) throw new ApiError ({ message: 'Category not found', status: 404, data: null });

  // check if category name already exists
  if(body.name && body.name !== category.name) {
    const categories = await checkCategoryByName([body.name]);
    if (categories.length) throw new ApiError ({ message: 'Category name already exists', status: 400, data: null });
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
  const countTypes: any = categories.map((cat) => {
    const typeArticle = cat.contents.filter((content) => content.type === CONTENT_TYPE.ARTICLE).length;
    const typeVideo = cat.contents.filter((content) => content.type === CONTENT_TYPE.VIDEO).length;
    const typeInfographic = cat.contents.filter((content) => content.type === CONTENT_TYPE.INFOGRAPHIC).length;

    return {
      ...cat,
      Article: typeArticle,
      Video: typeVideo,
      Infographic: typeInfographic
    };
  })

  return { categories: countTypes, total };
}

export async function createContent(body: any) {

  const {type, content, video, images, categoryId} = body;

  if (type === CONTENT_TYPE.ARTICLE && !content) 
    throw new ApiError ({ message: 'Article must have content', status: 400, data: null });
  if (type === CONTENT_TYPE.VIDEO && (!content || !video)) 
    throw new ApiError ({ message: 'Video must have video and content', status: 400, data: null });
  if (type === CONTENT_TYPE.INFOGRAPHIC && (!content || !images)) 
    throw new ApiError ({ message: 'Infographic must have images and content', status: 400, data: null });

  // check if category exists
  const category = await checkCategoryByCateid(categoryId);

  if (!category) throw new ApiError ({ message: 'Category not found', status: 404, data: null });

  const newContent = await saveContent({
    ...body,
    category,
    requiredMonths: body.requiredMonths * 30
  });

  return toContentDto(newContent);
}

export async function updateContentByConId(conId: string, body: any) {
  // check if content exists
  const exitingContent = await checkContentByConid(conId);
  if (!exitingContent) throw new ApiError ({ message: 'Content not found', status: 404, data: null });

  const {type, content, video, images, categoryId, requiredMonths, ...others} = body;

  const updated: Partial<ContentModel> = {
    ...exitingContent,
    ...others,
    requiredMonths: requiredMonths !== '' ? requiredMonths * 30 : exitingContent.requiredMonths,
  };

  // Check input data of type
  if (type === CONTENT_TYPE.ARTICLE && !content) 
    throw new ApiError ({ message: 'Article must have content', status: 400, data: null });
  if (type === CONTENT_TYPE.VIDEO && (!content || !video)) 
    throw new ApiError ({ message: 'Video must have video and content', status: 400, data: null });
  if (type === CONTENT_TYPE.INFOGRAPHIC && (!content || !images)) 
    throw new ApiError ({ message: 'Infographic must have images and content', status: 400, data: null });

  // update field when selecting input data of type
  if (type === CONTENT_TYPE.ARTICLE) { // Artile not have video and images
    updated.content = content;
    updated.images = null;
    updated.video = null;
  } else if (type === CONTENT_TYPE.VIDEO) { // Video not have images
    updated.content = content;
    updated.video = video;
    updated.images = null;
  } else if (type === CONTENT_TYPE.INFOGRAPHIC) { // infographic not have video
    updated.content = content;
    updated.images = images;
    updated.video = null;
  }

  updated.type = type;
  
  // check if categoryId exists so update it
  if (categoryId) {
    const category = await checkCategoryByCateid(categoryId);
    if (!category) throw new ApiError({ message: 'Category not found', status: 404, data: null });
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

  return { contents: contents, total };
}

