let md = require('markdown').markdown;

// convert markdown to html
function md2html(markdownText, callback) {
  let htmlText = md.toHTML(markdownText);
  if (callback) {
    callback(htmlText);
  }
  return htmlText;
}
