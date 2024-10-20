"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trie = void 0;
class Trie {
    root;
    constructor() {
        this.root = this.createNode(null, '');
    }
    createNode(parent, key) {
        return {
            key,
            parent,
            children: new Map(),
        };
    }
    insert(key) {
        let node = this.root;
        for (const char of key) {
            if (!node.children.has(char)) {
                node.children.set(char, this.createNode(node, char));
            }
            node = node.children.get(char);
        }
        node.end = true;
    }
    search(key) {
        let node = this.root;
        for (const char of key) {
            if (!node.children.has(char)) {
                return undefined;
            }
            node = node.children.get(char);
        }
        return !!node.end;
    }
    remove(key) {
        let node = this.root;
        for (const char of key) {
            if (!node.children.has(char)) {
                return;
            }
            node = node.children.get(char);
        }
        node.end = undefined;
    }
    prefixes(key) {
        let node = this.root;
        let current = '';
        const keys = [];
        for (const char of key) {
            if (!node.children.has(char)) {
                return keys.reverse();
            }
            current += char;
            node = node.children.get(char);
            keys.push(current);
        }
        return keys.reverse();
    }
}
exports.Trie = Trie;
