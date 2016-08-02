'use strict';

var config = require('../../modules/config')
  , flash = require('connect-flash');

var route = function route(req, res, next, abe) {
  var htmlToSend = '';

  var login = abe.fileUtils.concatPath(__dirname + '/../../partials/login.html')
  var html = abe.fileUtils.getFileContent(login);

  var template = abe.Handlebars.compile(html, {noEscape: true})

  var tmp = template({
    csrfToken: res.locals.csrfToken,
    config: JSON.stringify(abe.config),
    express: {
      req: req,
      res: res
    },
    info: req.flash('info')
  })

  return res.send(tmp);
}

exports.default = route