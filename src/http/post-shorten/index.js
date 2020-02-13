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
  const meta = {
    short_id: key,
    url: link,
    created: dayjs().toISOString(),
  };
  await data.set({ table, key, meta });
  return {
    headers: { 'content-type': 'application/json; charset=utf8' },
    body: JSON.stringify({
      original_url: link,
      short_id: key,
    }),
  };
};
