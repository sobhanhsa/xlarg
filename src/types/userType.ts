import { PostType } from "./postType";

export type UserType = {
    id              :   string;
    name            :   string;
    email           :   string;
    emailVerified   :   string;
    image           :   string;
    accounts        :   any[];
    sessions        :   any[];
    Post            :   PostType[];
    Comment         :   any[];
}