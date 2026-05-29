class ExpTable {
    constructor(table = []) {
        this.table = table;
    }

    get(n) {
        return n < this.table.length ? this.table[n]: n + 1;
    }

    add(i, j) {
        const H = i > 0 ? this.get(i - 1) : 0;
        const S = H - i;
        const A = Math.max(j, this.get(H));
        const newTableLength = Math.max(this.table.length, i, A - S);
        const newTable = new Array(newTableLength);
        for (let n = 0; n < newTableLength; n++) {
            if (n < i) {
                newTable[n] = Math.min(this.get(n), i);
            } else {
                newTable[n] = Math.max(this.get(n + S), A) - S;
            }
        }
        this.table = newTable;
    }
}
