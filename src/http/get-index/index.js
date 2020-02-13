const bugsnag = require('@bugsnag/js');
const data = require('@begin/data');
const templates = require('@architect/shared/templates');
const helpers = require('@architect/shared/helpers');

const html = templates.getIndexHtml();

const bugsnagClient = bugsnag(process.env.BUGSNAG_KEY);

exports.handler = async function http(req) {
  const { pathParameters } = req;
  console.log(pathParameters);
  if (pathParameters) {
    try {
      const { proxy: shortId } = pathParameters;
      console.log('shortId: ', shortId);
      if (shortId && shortId.length === 8) {
        const shortLink = await data.get({
          table: 'links',
          key: shortId.replace('/', ''),
        });
        console.log('shortLink: \n', shortLink);
        if (shortLink) {
          return helpers.returnShortLink(shortLink);
        }
        return helpers.returnNotFound();
      }
    } catch (error) {
      bugsnagClient.notify(error);
    }
  }
  return helpers.returnPage(html);
};
