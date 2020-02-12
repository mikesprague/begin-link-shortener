// const begin = require('@architect/functions');
const templates = require('@architect/shared/templates.js');

const html = templates.getIndexHtml();

exports.handler = async function http(req) {
  const { pathParameters } = req;
  if (pathParameters) {
    const { proxy: shortId } = pathParameters;
    console.log('pathParameters: ', pathParameters);
    console.log('shortId: ', shortId);
    if (shortId && shortId.length === 7) {
      console.log(`it's a short link!`);
    }
  }

  return {
    headers: {
      'content-type': 'text/html; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: html
  }
}
