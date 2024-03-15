import { UserType } from "./userType";

export type PostType = {   
    _id          :   string;   
    createdAt   :   string;  
    slug        :   string;   
    title       :   string;
    desc        :   string;
    img         :   string;
    views       :   number    ;   
    catSlug     :   string;
    cat         :   object;  
    userEmail   :   string;
    user        :   UserType;     
    comments    :   []
} & {
    id:string
}

