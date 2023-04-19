import { Post } from "./post.enum";

export interface Instructor{
    id: number;
    neptun: string;
    name: string;
    email: string;
    post: Post;
    subjectIds: Array<number>;
    subjectNames: Array<string>;
}
