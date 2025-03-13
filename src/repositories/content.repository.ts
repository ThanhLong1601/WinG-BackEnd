import { In, LessThan, Not } from "typeorm";
import { dataSource } from "../data-source";
import { CategoryContentModel } from "../models/category_content.model";
import { ContentModel } from "../models/content.model";
import { CONTENT_STATUS, CONTENT_TYPE } from "../constants/content.constants";
import { UserModel } from "../models/user.model";
import { UserViewContentModel } from "../models/user_view_content.model";
import dayjs from "dayjs";
import { UserContentModel } from "../models/user_content.model";

/*
  -----------------------REPOSITORY FOR CATEGORY
*/

export async function checkCategoryByCateid(cateid: string) {
  const categoryRepository = dataSource.getRepository(CategoryContentModel);
  const category = await categoryRepository.findOne({ where: { cateid } });

  return category;
}

export async function updateCategory(cat: CategoryContentModel, updateData: Partial<CategoryContentModel>){
  const categoryRepository = dataSource.getRepository(CategoryContentModel);
  const updatedCategory = {...cat, ...updateData};
  await categoryRepository.save(updatedCategory);
  return updatedCategory;
}

export async function checkCategoryByName(name: string[], cateid: string = '') {
  const categoryRepository = dataSource.getRepository(CategoryContentModel);

  const where = cateid ? {name: In(name), cateid: Not(cateid) } : { name: In(name) };
  const categories = await categoryRepository.find({ where });
  return categories;
}

export async function saveCategory(data: Partial<CategoryContentModel>[]) {
  const categoryRepository = dataSource.getRepository(CategoryContentModel);

  const newCategory = categoryRepository.create(data);
  await categoryRepository.save(newCategory);

  return newCategory;
}

export async function getAllCategory() {
  const categoryRepository = dataSource.getRepository(CategoryContentModel);
  const result = await categoryRepository.find({
    where: { status: CONTENT_STATUS.ACTIVE },
    order: { name: 'ASC' }
  });
  return result;
}

export async function getAllCategoryAndContent(page: number, perPage: number) {
  const categoryRepository = dataSource.getRepository(CategoryContentModel);

  const result = await categoryRepository.findAndCount({
    relations: ['contents.userViewContents'],
    take: perPage,
    skip: (page - 1) * perPage
  });
  return result;
}


/*
  -----------------------REPOSITORY FOR CONTENT
*/

export async function saveContent(data: Partial<ContentModel>) {
  const contentRepository = dataSource.getRepository(ContentModel);

  const newContent = contentRepository.create(data);
  await contentRepository.save(newContent);

  return newContent;
}

export async function getContentByConid(conid: string) {
  const contentRepository = dataSource.getRepository(ContentModel);
  const content = await contentRepository.findOne({ 
    where: { conid },
    relations: ['category', 'userViewContents']
  });

  return content;
}

export async function getAllContents(filter: string, page: number, perPage: number) {
  const contentRepository = dataSource.getRepository(ContentModel);
  
  const whereCondition = filter === 'all' ? {} : { categoryId: filter };

  const result = await contentRepository.findAndCount({
    where: whereCondition,
    relations: ['category', 'userViewContents'],
    order: { createdAt: 'DESC' },
    take: perPage,
    skip: (page - 1) * perPage
  });
  return result;
}

export async function countContentByType() {
  const contentRepository = dataSource.getRepository(ContentModel);
  
  const [articleCount, videoCount, infographicCount] = await Promise.all([
    contentRepository.count({ where: { type: CONTENT_TYPE.ARTICLE } }),
    contentRepository.count({ where: { type: CONTENT_TYPE.VIDEO } }),
    contentRepository.count({ where: { type: CONTENT_TYPE.INFOGRAPHIC } }),
  ]);

  return { articleCount, videoCount, infographicCount };
}

export async function checkContentExits(conid: string) {
  const contentRepository = dataSource.getRepository(ContentModel)

  return await contentRepository.findOne({
    where: {conid}
  })
}

export async function saveUserViewContent(conid: string, uid: string) {
  const userViewContentRepository = dataSource.getRepository(UserViewContentModel);

  let userViewContent = await userViewContentRepository.findOne({where: {conid, uid}})

  if (userViewContent) {
    userViewContent.views += 1;
    await userViewContentRepository.save(userViewContent);
  } else {
    userViewContent = userViewContentRepository.create({
      conid, uid
    });

    await userViewContentRepository.save(userViewContent);
  }

  return true;
}

export async function getContentAllowedSeen(uid: string, filter: string, page: number, perPage: number) {
  const contentRepository = dataSource.getRepository(ContentModel);

  const whereCondition = filter === 'all' ? {} : { categoryId: filter };

  const result = await contentRepository.findAndCount({
    where: {
      ...whereCondition,
      userContents: {
        uid,
        isAccess: true,
      },
    },
    relations: ['category', 'userContents'],
    order: { createdAt: 'DESC' },
    take: perPage,
    skip: (page - 1) * perPage,
  });

  return result;
}

export async function getContentByUid(uid: string, conid: string) {
  const userContentRepository = dataSource.getRepository(ContentModel);

  const userContent = await userContentRepository.findOne({
    where: { 
      conid,
      userContents: {
        uid,
        isAccess: true
      }
    },
    relations: ['category', 'userViewContents']
  });

  return userContent;
}