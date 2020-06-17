

function Node (val) {
    this.val = val;
    this.next = null;
    this.prev = null;
}

function DoublyLinkedList () {
    this.head = null;
    this.tail = null;
}

DoublyLinkedList.prototype.addStart = function (value) {
    let newNode = new Node(value);
    let tmp = this.head;
    this.head = newNode;
    newNode.next = tmp;
    if(tmp) {
        tmp.prev = newNode;
    }
    if(!this.tail) {
        this.tail = this.head;
    }
    return this;
};


DoublyLinkedList.prototype.removeEnd = function () {
    if(this.tail) {
        if(this.tail.prev) {
            this.tail.prev.next = null;
            this.tail = this.tail.prev;
        } else {
            this.tail = null;
            this.head = null;
        }
        return true;
    }
    return false;
};
