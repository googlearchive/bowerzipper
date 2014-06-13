#!/usr/bin/env python
#
# Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
# This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
# The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
# The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
# Code distributed by Google as part of the polymer project is also
# subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt

__author__ = 'e.bidelman@google.com (Eric Bidelman)'

import webapp2

from django.template.loader import render_to_string


class MainHandler(webapp2.RequestHandler):

  def render(self, data={}, template_path=None, status=None, message=None,
             relpath=None):
    if status is not None and status != 200:
      self.response.set_status(status, message)

    try:
      self.response.out.write(render_to_string(template_path, data))
    except Exception:
      handle_404(self.request, self.response, Exception)

  def get(self, path):
    return self.render(data={}, template_path=os.path.join(path + '.html'))


def handle_401(request, response, exception):
  ERROR_401 = (
    '<title>401 Unauthorized</title>\n'
    '<h1>Error: Unauthorized</h1>\n'
    '<h2>User does not have permission to view this page.</h2>')
  response.write(ERROR_401)
  response.set_status(401)

def handle_404(request, response, exception):
  ERROR_404 = (
    '<title>404 Not Found</title>\n'
    '<h1>Error: Not Found</h1>\n'
    '<h2>The requested URL <code>%s</code> was not found on this server.'
    '</h2>' % request.url)
  response.write(ERROR_404)
  response.set_status(404)

def handle_500(request, response, exception):
  logging.exception(exception)
  ERROR_500 = (
    '<title>500 Internal Server Error</title>\n'
    '<h1>Error: 500 Internal Server Error</h1>')
  response.write(ERROR_500)
  response.set_status(500)


app = webapp2.WSGIApplication([
  ('/(.*)', MainHandler),
], debug=True)
