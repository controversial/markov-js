class Markov {
    constructor(lists) {
        this.model = lists;
    }
    
    // Random element from a list
    static choice(list) {
        return list[Math.floor(Math.random() * list.length)];
    }
    
    // Choose random out of the first element of each list
    getStart() {
        return Markov.choice(this.model.map(n => n[0]));
    }
    
    // Get an element to follow a given element
    getFollowing(previous) {
        const possibilities = [];
        const listsWithPrevious = this.model.filter(list => list.includes(previous));
        listsWithPrevious.forEach((list) => {
            list.forEach((item, index) => {
                if (item === previous) {
                    const next = list[index + 1];
                    if (next !== undefined) possibilities.push(next);
                }
            });
        });
        return possibilities;
    }
}

module.exports = Markov;