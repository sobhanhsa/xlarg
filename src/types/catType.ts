export type categoryType = {
    _id      : string;
    slug    : string; 
    title   : string;
    img     : string;
    Posts   : [];

} & {
    id:string
}