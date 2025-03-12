import { CategoryContentModel } from "../models/category_content.model";
import { ContentDto, toContentDto } from "./content.dto";

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

export interface CategoryWithStatisticDto extends CategoryDto {
  contents: ContentDto[]; //Add or remove?
  Article: number;
  Video: number;
  Infographic: number;
  Views: number;
}

export function toCategoryWithStatisticDto(category: CategoryContentModel, article: number, video: number, infographic: number, views: number): CategoryWithStatisticDto {
  return {
    ...toCategoryDto(category),
    contents: category.contents.map(content => toContentDto(content)),//Add or remove?
    Article: article,
    Video: video,
    Infographic: infographic,
    Views: views
  };
}