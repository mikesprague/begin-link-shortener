const data = require('@begin/data');
const begin = require('@architect/functions');
const templates = require('@architect/shared/templates');

const html = templates.getIndexHtml();

exports.handler = async function http(req) {
  const { pathParameters } = req;
  if (pathParameters) {
    const { proxy: shortId } = pathParameters;
    console.log('shortId: ', shortId);
    if (shortId && shortId.length === 8) {
      console.log("it's a short link!");
      const shortLink = await data.get({
        table: 'links',
        key: shortId,
      });
      console.log('shortLink: ', shortLink);
      if (shortLink) {
        return {
          statusCode: 302,
          headers: { location: shortLink.original_url },
        };
      }
      return {
        statusCode: 404,
        headers: { 'content-type': 'text/html; charset=utf8' },
        body: 'Short link not found',
      };
    }
  }

  return {
    headers: {
      'content-type': 'text/html; charset=utf8',
      // 'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    body: html,
  };
};
