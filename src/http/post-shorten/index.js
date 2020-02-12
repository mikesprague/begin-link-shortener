const begin = require('@architect/functions');
const data = require('@begin/data');
const dayjs = require('dayjs');
const nanoid = require('nanoid');

const parseBody = begin.http.helpers.bodyParser;

exports.handler = async function http(req) {
  const table = 'links';
  const body = parseBody(req);
  const { link } = body;
  const key = nanoid(7);
  const linkData = {
    url: link,
    created: dayjs().toISOString(),
    visits: 0,
  };
  console.log(linkData);
  const newLink = await data.set({ table, key, linkData });
  consolee.log(newLink);
  // return {
  //   status: 302,
  //   headers: {
  //     'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
  //   },
  //   location: '/'
  // }
};
