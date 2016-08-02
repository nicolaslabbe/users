'use strict';

var config = require('../../modules/config')
  , User = require('../../modules/User')
  , fs = require('fs')
  , Cookies = require('cookies')
  , jwt = require('jwt-simple')
  , crypto = require('crypto');

var route = function route(req, res, next, abe) {
  if(typeof req.query.token !== 'undefined' && req.query.token !== null) {
    User.findByResetPasswordToken(req.query.token, function (err, user) {
      var reset = abe.fileUtils.concatPath(__dirname + '/../../partials/reset.html')
      var html = abe.fileUtils.getFileContent(reset);

      var template = abe.Handlebars.compile(html, {noEscape: true})

      var tmp = template({
        csrfToken: res.locals.csrfToken,
        config: JSON.stringify(abe.config),
        express: {
          req: req,
          res: res
        },
        token: req.query.token,
        info: req.flash('info')
      })

      return res.send(tmp);
    });
  }else {
    res.redirect('/abe/plugin/users/forgot')
  }
}

exports.default = route