export declare class Trie {
    private root;
    constructor();
    private createNode;
    insert(key: string): void;
    search(key: string): boolean;
    remove(key: string): void;
    prefixes(key: string): string[];
}
