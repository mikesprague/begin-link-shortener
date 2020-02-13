exports.returnPage = (html, useCache = true) => {
  if (useCache) {
    return {
      headers: {
        'content-type': 'text/html; charset=utf8',
        // 'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      },
      body: html,
    };
  }
  return {
    headers: {
      'content-type': 'text/html; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    body: html,
  };
};

exports.returnShortLink = (shortLink) => ({
  statusCode: 302,
  headers: { location: shortLink.meta.url },
});

exports.returnNotFound = () => ({
  statusCode: 404,
  headers: { 'content-type': 'text/html; charset=utf8' },
  body: 'Short link not found',
});
