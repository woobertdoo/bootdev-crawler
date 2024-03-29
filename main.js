const { argv } = require('node:process');
const { crawlPage } = require('./crawl.js');
const { printReport } = require('./report.js');



function main() {
    if (argv.length < 3) {
        console.log("Error: Needs one command line argument {BASE_URL}");
        return;
    } else if (argv.length > 3) {
        console.log("Error: Too many command line arguments")
        return;
    }
    console.log(`Crawler starting from ${argv[2]}`);
    crawlPage(argv[2], argv[2], {}).then((response) => {
        printReport(response);
    });
}


main();
