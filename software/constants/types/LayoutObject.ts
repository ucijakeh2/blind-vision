export default interface LayoutObject {
    title: string,
    imageSource: object,
    destination?: string,
    replace?: boolean,
    dropdown?: Array<string>,
    status?: boolean,
}