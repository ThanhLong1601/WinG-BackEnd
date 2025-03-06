import { ContentModel } from "../models/content.model";
import { CategoryDto, toCategoryDto, toShortCategoryDto } from "./category.dto";

  
interface ContentDto {
  conid: string,
  typeOfContent: string,
  requiredDays: number,
  banner: string,
  title: string,
  category: Partial<CategoryDto>,
  content: string,
  video: string,
  images: string,
  status: string,
  createdAt: Date,
  updatedAt: Date
};

export function toContentDto (content: ContentModel): ContentDto {
  return {
    conid: content.conid,
    typeOfContent: content.typeOfContent,
    requiredDays: content.requiredDays / 30,
    banner: content.banner,
    title: content.title,
    category: content.category ? toCategoryDto(content.category) : null,
    content: content.content,
    video: content.video,
    images: content.images,
    status: content.status,
    createdAt: content.createdAt,
    updatedAt: content.updatedAt
  };
}

export function toShortContentDto (content: ContentModel): Partial<ContentDto> {
  return {
    conid: content.conid,
    title: content.title,
    typeOfContent: content.typeOfContent,
    category: content.category ? toShortCategoryDto(content.category) : null,
    requiredDays: content.requiredDays,
    status: content.status
  };
}

export function toListContentDtos (contents: ContentModel[]) {
  if (!contents) return [];
  return contents.map(content => (toShortContentDto(content)));
}