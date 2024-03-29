function printReport(pages) {
    console.log('Starting Report..');
    for (const obj of sortCounts(pages)) {
        const url = Object.keys(obj)[0];
        const count = obj[url];
        console.log(`Found ${count} internal links to ${url}`);
    }
}

function sortCounts(pages) {
    let sorted = [];
    for (const [key, value] of Object.entries(pages)) {
        const obj = {};
        obj[key] = value;
        sorted.push(obj);
    }
    sorted.sort((a, b) => {
        const keyA = Object.keys(a)[0];
        const keyB = Object.keys(b)[0];
        if (a[keyA] < b[keyB]) {
            return 1;
        } else if (a[keyA] > b[keyB]) {
            return -1;
        } else {
            return 0;
        }
    })
    console.log(sorted)
    return sorted;
}

module.exports = { printReport };
