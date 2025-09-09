import { UUID } from "crypto";

export interface postType {
   article_id: number;
   title: string;
   picture: string;
   content: string;
   updated_at: Date;
   created_at: Date;
   likes_count: number;
   author: UUID;
   author_username: string;
}
export interface dataRegisterType {
   username: string;
   email: string;
   password: string;
}

export interface userProfile {
   user_id: UUID;
   username: string;
   email: string;
   profile_picture_url: string;
   created_at: Date;
   updated_at: Date;
}
export interface userToken {
   user_id: UUID;
   username: string;
   email: string;
   access: string;
   profile_picture_url: string;
   created_at: Date;
   updated_at: Date;
}

export interface dataLoginType {
   email: string;
   password: string;
}

export interface ArticleComment {
   id: number;
   article: number;
   user: userProfile;
   parent: number | null;
   content: string;
   status: string;
   created_at: string;
   updated_at: string;
   replies_count: number;
   replies: ArticleComment[];
}

export interface CommentCreate {
   article: number;
   parent?: number;
   content: string;
}
