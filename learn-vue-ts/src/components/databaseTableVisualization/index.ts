export interface formItem {
    name: string,
    type: string,
    greaterThan?: null | number,
    lessThan?: null | number,
    pattern?: "like" | "equal",
    condition?: null | string,
    startTime?: null | string,
    endTime?: null | string,
}