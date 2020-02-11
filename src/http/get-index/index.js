// const begin = require('@architect/functions');
const templates = require('@architect/shared/templates.js');
console.log('templates: ', templates);

const html = templates.getIndexHtml();
console.log(html);

exports.handler = async function http(req) {
  console.log(req)
  return {
    headers: {
      'content-type': 'text/html; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: html
  }
}
