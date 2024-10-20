interface TrieNode {
    key: string
    parent: TrieNode | null
    children: Map<string, TrieNode>
    end?: boolean
  }
  
  export class Trie {
    private root: TrieNode
  
    constructor() {
      this.root = this.createNode(null, '')
    }
  
    private createNode(parent: TrieNode | null, key: string) {
      return {
        key,
        parent,
        children: new Map(),
      }
    }
  
    insert(key: string) {
      let node = this.root
      for (const char of key) {
        if (!node.children.has(char)) {
          node.children.set(char, this.createNode(node, char))
        }
        node = node.children.get(char)!
      }
      node.end = true
    }
  
    search(key: string) {
      let node = this.root
      for (const char of key) {
        if (!node.children.has(char)) {
          return undefined
        }
        node = node.children.get(char)!
      }
      return !!node.end
    }
  
    remove(key: string) {
      let node = this.root
      for (const char of key) {
        if (!node.children.has(char)) {
          return
        }
        node = node.children.get(char)!
      }
      node.end = undefined
    }
  
    prefixes(key: string): string[] {
      let node = this.root
      let current = ''
      const keys: string[] = []
      for (const char of key) {
        if (!node.children.has(char)) {
          return keys.reverse()
        }
        current += char
        node = node.children.get(char)!
        keys.push(current)
      }
      return keys.reverse()
    }
  }