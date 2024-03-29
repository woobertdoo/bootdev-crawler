const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');

test('gets rid of https://', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});

test('gets rid of http://', () => {
    expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});


test('gets rid of ending /', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('gets a tag links', () => {
    expect(getURLsFromHTML('<a href="/">Learn Backend Development</a><a href="/blog">Blog</a>', 'https://boot.dev')).toEqual(['https://boot.dev/', 'https://boot.dev/blog']);
})

test('converts relative url to absolute url', () => {
    expect(getURLsFromHTML('<a href="/api">API Documentation</a>', 'https://boot.dev')).toEqual(['https://boot.dev/api'])
})
