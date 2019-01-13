
export default interface ILabel {
    label: string;
    annotate(msg: string): string;
    toString(): string;
}