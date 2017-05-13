class MarkovElement {
  constructor(value, isLast = false) {
    this.value = value;
    this.isLast = isLast;
  }
}

class Markov {
  constructor(lists) {
    this.model = lists.map(
      n => n.map(
        // Instantiate a MarkovElement, including information about whether it's the last element.
        (element, index, array) => new MarkovElement(element, index === array.length - 1),
      ),
    );
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
    // Find all lists which contain the word we're searching for
    const listsWithPrevious = this.model.filter(list => list.map(n => n.value).includes(previous));
    // In each list...
    listsWithPrevious.forEach((list) => {
      // Check each item
      list.forEach((item, index) => {
        // If the item is what we're searching for, record the item that succeeds it
        if (item.value === previous) {
          const next = list[index + 1];
          if (next !== undefined) possibilities.push(next);
        }
      });
    });
    return possibilities;
  }

  // Make a chain
  get() {
    const out = [this.getStart()];
    while (true) {
      const recent = out[out.length - 1];
      // If the most recent item is the end of a sentence, return all the values in the chain
      if (recent.isLast) return out.map(n => n.value);
      // Otherwise continue
      const possibilities = this.getFollowing(recent.value);
      out.push(Markov.choice(possibilities));
    }
  }
}

module.exports = Markov;
