export interface ImageData {
    id: string;
    url: string;
    date: string;
    description: string;
  }
  
  export interface MomentData {
    id: string;
    name: string;
    description: string;
    images: ImageData[];
  }