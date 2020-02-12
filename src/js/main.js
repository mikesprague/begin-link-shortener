import '../scss/styles.scss';
import axios from 'axios';
import bugsnag from '@bugsnag/js';
import * as DOMPurify from 'dompurify';
import * as helpers from './modules/helpers';

if (!helpers.isDev()) {
  window.bugsnagClient = bugsnag('202988736270fa680453c640bf975559');
}

const form = document.querySelector('.url-form');
const result = document.querySelector('.result-section');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const input = document.querySelector('.url-input');
  const linkToShorten = DOMPurify.sanitize(input.value);
  await axios.post('/shorten', {
    link: linkToShorten,
  }).then((response) => {
    const resultTemplate = helpers.getResultMarkup(location.origin, response.data.short_id);
    result.innerHTML = resultTemplate;
    helpers.initCopyToClipboard();
    helpers.initFontAwesomeIcons();
    return response.data;
  }).catch((error) => {
    helpers.handleError(error);
  });
});
