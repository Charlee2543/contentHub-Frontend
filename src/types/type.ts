import { UUID } from "crypto";

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
