import { Status } from "../category/types";


export interface ILessonForData {
  coures: string;
  videoUrl: string;
  title: string;
  description: string;
}


export interface ILesson extends ILessonForData{
  _id?: string;

  createdAt: string;
}

export interface IInitialData {
  status: Status;
  lessons: ILesson[];
}
