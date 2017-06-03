declare interface IBaseStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'baseStrings' {
  const strings: IBaseStrings;
  export = strings;
}
