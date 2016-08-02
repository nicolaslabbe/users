'use strict';

var config = require('../../modules/config')
  , User = require('../../modules/User')
  , fs = require('fs')
  , Cookies = require('cookies')
  , jwt = require('jwt-simple');

var route = function route(req, res, next, abe) {
  abe.Hooks.instance.trigger('beforeRoute', req, res, next);
  if(typeof res._header !== 'undefined' && res._header !== null) return;

  var htmlToSend = '';

  var login = abe.fileUtils.concatPath(__dirname + '/../../partials/users-list.html')
  var html = abe.fileUtils.getFileContent(login);

  var template = abe.Handlebars.compile(html, {noEscape: true})
  var roles = []
  var roles = config.getConfig('roles', abe);
  var tmp = template({
    users: User.getAll(),
    express: {
      req: req,
      res: res
    },
    config: JSON.stringify(abe.config),
    roles: roles
  })
  
  return res.send(tmp);
}

exports.default = route