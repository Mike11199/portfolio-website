export interface ProjectContent {
  title: string;
  category: string;
  technologies?: string[];
  highlights: { heading: string; text: string }[];
  detailGroups: { heading: string; paragraphs: number[] }[];
}
