console.log("Hello World!");

class KnightsTravails{
    constructor(start, end) {
        this.board = [];
        this.visited = [];
        this.queue = [];
        this.path = [];
        this.start = start;
        this.end = end;
    }

    printStart(){
        console.log(this.start);
        return this.start;
    }
}

module.exports = {KnightsTravails};