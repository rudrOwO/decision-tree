export default class Queue {
    #storage = [];
    left = 0;
    right = -1;     
    
    enqueue(item) {
        this.#storage.push(item);
        ++this.right;
    }
    
    deque() {
        return this.#storage[this.left++];
    }
    
    isEmpty() {
        return this.left > this.right;
    }
}