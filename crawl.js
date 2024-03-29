const { JSDOM } = require('jsdom');

function normalizeURL(url) {
    const urlObj = new URL(url);
    let normalized = urlObj.host + urlObj.pathname;
    if (normalized.endsWith('/')) {
        normalized = normalized.slice(0, -1);
    }
    return normalized;
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const aTags = dom.window.document.querySelectorAll('a');
    let urls = [];
    for (let tag of aTags) {
        if (tag.href.includes(baseURL)) {
            urls.push(tag.href);
        } else {
            urls.push(`${baseURL}${tag.href}`);
        }
    }
    return urls;
}

async function crawlPage(baseUrl, currentUrl, pages) {
    const normalizedBase = normalizeURL(baseUrl);
    const normalizedCurrent = normalizeURL(currentUrl);
    if (normalizedCurrent.split("/")[0] != normalizedBase.split("/")[0]) {
        return pages;
    }
    if (pages[normalizedCurrent]) {
        pages[normalizedCurrent]++;
        return pages;
    } else {
        pages[normalizedCurrent] = 1;
    }
    try {
        console.log(`Now requesting from ${currentUrl}`);
        const response = await fetch(currentUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/html'
            }
        });
        if (response.status >= 400) {
            throw new Error("Error code ${response.status}");
        }
        if (!response.headers.get('content-type').includes('text/html')) {
            throw new Error("Error: Non-HTML Content");
        }

        const urls = getURLsFromHTML(await response.text(), baseUrl);
        for (let url of urls) {
            pages = await crawlPage(baseUrl, url, pages);
        }
    } catch (err) {
        console.log(err.message);
    }
    return pages;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}
