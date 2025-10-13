export interface CreateAreaDTO {
  nombre: string;
}

export interface UpdateAreaDTO {
  nombre?: string;
}

export interface AreaResponse {
  id_area: number;
  nombre: string;
}
