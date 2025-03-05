import { In, Not } from "typeorm";
import { dataSource } from "../data-source";
import { CategoryContentModel } from "../models/category_content.model";
import { ContentModel } from "../models/content.model";

export async function saveContent(data: Partial<ContentModel>) {
  const contentRepository = dataSource.getRepository(ContentModel);

  const newContent = contentRepository.create(data);
  await contentRepository.save(newContent);

  return newContent;
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

export async function checkContentByConid(conid: string) {
  const contentRepository = dataSource.getRepository(ContentModel);
  const content = await contentRepository.findOne({ 
    where: { conid },
    relations: ['category']
  });

  return content;
}

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