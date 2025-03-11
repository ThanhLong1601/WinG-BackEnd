import { ContentModel } from "../models/content.model";
import { CategoryDto, toCategoryDto } from "./category.dto";

  
interface ContentDto {
  conid: string,
  type: string,
  requiredMonths: number,
  banner: string,
  title: string,
  category: Partial<CategoryDto>,
  content: string,
  video: string,
  images: string[] | null,
  status: string,
  viewCount: number,
  createdAt: Date,
  updatedAt: Date
};

export function toContentDto (content: ContentModel): ContentDto {
  return {
    conid: content.conid,
    type: content.type,
    requiredMonths: content.requiredMonths / 30,
    banner: content.banner,
    title: content.title,
    category: content.category ? toCategoryDto(content.category) : null,
    content: content.content,
    video: content.video,
    images: content.images && Array.isArray(content.images) ? content.images : null,
    status: content.status,
    viewCount: content.getViewCount(),
    createdAt: content.createdAt,
    updatedAt: content.updatedAt
  };
}

export function toListContentDto (contents: ContentModel[]): ContentDto[] {
  if (!contents) return [];
  
  return contents.map(content => toContentDto(content));
}
