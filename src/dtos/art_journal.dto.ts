import { ArtJournal } from "../models/art_journal.model";

interface ArtJournalDTO {
  aid: string;
  name: string;
  status: string;
  point: number;
  isDrawCircle: boolean;
  description: string;
  banner: string;
  totalSubmissions: number;
  totalSubmissionsThisWeek: number;
  createdAt: Date;
  updatedAt: Date;
}

export function toArtJournalDTO(art: ArtJournal): ArtJournalDTO {
  return {
    aid: art.aid,
    name: art.name,
    status: art.status,
    point: art.point,
    isDrawCircle: art.isDrawCircle,
    description: art.description,
    banner: art.banner,
    totalSubmissions: art.getTotalSubmissions(),
    totalSubmissionsThisWeek: art.getTotalSubmissionsThisWeek(),
    createdAt: art.createdAt,
    updatedAt: art.updatedAt
  };
}

export function toListArtJournalDTO(arts: ArtJournal[]): ArtJournalDTO[] {
  if (!arts) return [];
  
  return arts.map(art => toArtJournalDTO(art));
}