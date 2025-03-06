import { CategoryContentModel } from "../models/category_content.model";

export interface CategoryDto {
  cateid: string,
  name: string,
  status: string
}

export function toCategoryDto(category: CategoryContentModel): CategoryDto {
  return {
    cateid: category.cateid,
    name: category.name,
    status: category.status
  };
}

export function toShortCategoryDto(category: CategoryContentModel): Partial<CategoryDto> {
  return {
    cateid: category.cateid,
    name: category.name,
  };
}
