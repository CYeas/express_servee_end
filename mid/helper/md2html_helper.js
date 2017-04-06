let md = require('markdown').markdown;

/**
 * convert markdown to html
 * @param  {string}   markdownText the md string
 * @param  {Function} callback     callback
 * @return {string}                the string contain html text
 */
function md2html(markdownText, callback) {
  let htmlText = md.toHTML(markdownText);
  if (callback) {
    callback(htmlText);
  }
  return htmlText;
}

module.exports = md2html;
