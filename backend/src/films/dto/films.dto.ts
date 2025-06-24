export class FilmDto {
  id: string;
  title?: string;
  director?: string;
  description?: string;
  rating?: number;
  tags?: string[];
  about?: string;
  image?: string;
  cover?: string;
  schedule?: {
    id?: string;
    daytime?: Date;
    hall?: number;
    rows?: number;
    seats?: number;
    price?: number;
    taken?: string[];
  }[];
}
