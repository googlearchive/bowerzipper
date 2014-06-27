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
import os
import logging

from google.appengine.api import urlfetch, modules


class ArchiveHandler(webapp2.RequestHandler):

  def archive(self):

    archiver_host = modules.get_hostname(module="zipper")

    url = 'http://%s/archive?%s' % (archiver_host, self.request.query_string)
    logging.info('dispatching to archiver at: %s', url)
    result = urlfetch.fetch(url, deadline=60)
    return result.content

  def get(self):
    self.response.headers['Content-Type'] = 'application/zip'
    return self.response.out.write(self.archive())

app = webapp2.WSGIApplication([
  ('/archive', ArchiveHandler),
], debug=True)
