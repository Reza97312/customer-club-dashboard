export interface LevelFile {
  id: number;
  key: string;
  mimeType: string;
  size: string;
  link: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface LevelItem {
  id: number;
  name: string;
  scores: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  file: LevelFile | null;
}

export interface LevelsResponse {
  success: boolean;
  result: LevelItem[];
}
