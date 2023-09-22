interface DropItem{
    label:string,
    value:string
}
export interface FormItem {
    name: string,
    type: string,
    data?:DropItem[],
    greaterThan?: null | number,
    lessThan?: null | number,
    pattern?: "like" | "equal",
    condition?: null | string,
    startTime?: null | string,
    endTime?: null | string,
    value?: null | boolean,
}