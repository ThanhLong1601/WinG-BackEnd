import dayjs from "dayjs";
import { ContentModel } from "../models/content.model";
import { CategoryDto, toCategoryDto } from "./category.dto";

  
export interface ContentDto {
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

export interface ContentShortDto {
  conid: string,
  banner: string,
  title: string,
  type: string,
  createdAt: Date
}

export function toListContentForUserDto (contents: ContentModel[]): ContentShortDto[] {
  if (!contents) return [];
  
  return contents.map(content => {
    return {
      conid: content.conid,
      banner: content.banner,
      title: content.title,
      type: content.type,
      createdAt: content.createdAt
    }
  });
}

export function toListContentForAdminDto (contents: ContentModel[]) {
  if (!contents) return [];
  
  return contents.map(content => {
    return {
      conid: content.conid,
      title: content.title,
      category: content.category ? toCategoryDto(content.category) : null,
      type: content.type,
      requiredMonths: content.requiredMonths / 30,
      viewCount: content.getViewCount(),
      status: content.status,
    }
  });
}