function staticAsset(filename) {
  let origin
  let env = process.env.NODE_ENV
  if (env === 'production') {
    origin = process.env.BEGIN_STATIC_EDGE // CDN
  } else if (env === 'staging') {
    origin = process.env.BEGIN_STATIC_ORIGIN // Preview
  } else {
    origin = '/_static' // Handles local use cases
  }
  return `${origin}/${filename}`
}

exports.getIndexHtml = () => {
  const siteName = 'm12e.link';
  const pageTitle = `${siteName} | URL Shortener`;
  const indexTemplate = `
<!DOCTYPE html>
<html lang="en">
<head class="h-100">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>${pageTitle}</title>
  <meta name="subject" content="">
  <meta name="keywords" content="">
  <meta name="description" content="">
  <meta name="author" content="">
  <meta name="theme-color" content="">
  <meta name="apple-mobile-web-app-title" content="${pageTitle}">
  <meta name="application-name" content="${pageTitle}">
  <!-- <link rel="canonical" href="https://bigred.link"/> -->
  <!-- <link rel="preconnect" href="https://www.googletagmanager.com">
  <link rel="dns-prefetch" href="https://www.google-analytics.com"> -->
  <link rel="preconnect" href="https://sessions.bugsnag.com">
  <link rel="preload" as="script" type="text/javascript" href="${staticAsset('js/main.js')}">
  <link rel="preload" as="style" type="text/css" href="${staticAsset('css/styles.css')}">
  <link rel="preload" as="style" type="text/css" href="https://fonts.googleapis.com/css?family=Graduate&display=swap">
  <link rel="preload" as="font" type="font/woff2" href="https://fonts.gstatic.com/s/graduate/v7/C8cg4cs3o2n15t_2YygW43yvZxn3.woff2" crossorigin>
  <link rel="stylesheet" href="${staticAsset('css/styles.css')}">
</head>
<body class="h-100">
  <div class="container mt-3 mb-3 d-flex flex-column h-100">
    <div class="header">
      <h1 class="page-title display-4 text-center mt-2 mb-4">${siteName}</h1>
    </div>
    <div class="app flex-grow-1 text-center">
      <form class="url-form">
        <div class="input-group input-group-lg mb-3">
          <input type="text" class="url-input text-center form-control" placeholder="Paste in a link to shorten it" name="link" required autofocus>
          <div class="input-group-append">
            <button class="btn btn-shorten" type="submit">Shorten!</button>
          </div>
        </div>
      </form>
      <div class="result-section"></div>
    </div>
    <footer class="footer mt-5 fixed-bottom">
      <p class="text-center small mb-1">Copyright &copy; 2020 ${siteName}. All Rights Reserved</p>
    </footer>
  </div>
  <script src="${staticAsset('js/main.js')}"></script>
  <!-- <script async src="https://www.googletagmanager.com/gtag/js?id=UA-461185-34"></script> -->
  <!-- <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'UA-461185-34');
  </script> -->
</body>
</html>
`;

  return indexTemplate;
}