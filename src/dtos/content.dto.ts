import { ContentModel } from "../models/content.model";
import { CategoryDto, toCategoryDto } from "./category.dto";

  
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
  status: string
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
    status: content.status
  };
}