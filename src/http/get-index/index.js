const data = require('@begin/data');
const templates = require('@architect/shared/templates');
const helpers = require('@architect/shared/helpers');

const html = templates.getIndexHtml();

exports.handler = async function http(req) {
  const { pathParameters } = req;
  if (pathParameters) {
    const { proxy: shortId } = pathParameters;
    if (shortId && shortId.length === 8) {
      const shortLink = await data.get({
        table: 'links',
        key: shortId.replace('/', ''),
      });
      if (shortLink) {
        console.log(shortLink);
        return helpers.returnShortLink(shortLink);
      }
      return helpers.returnNotFound();
    }
  }
  return helpers.returnPage(html);
};
