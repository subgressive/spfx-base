export interface IList{
    Title: string;
    Id: string;
    Description:string;
    Hidden: boolean;
}

export interface ILists{
    value: IList[];
}