/**
 * Sovereign City — shared front-end URL configuration (canonical source).
 *
 * Copy into each static app that participates in cross-app navigation:
 *   apps/gus/ecosystem-urls.js
 *   apps/fam/ecosystem-urls.js
 *   apps/infinite-agentic-loop/ecosystem-urls.js
 *
 * See docs/architecture/LOCAL_URL_REGISTRY.md for service map and consumption.
 */
(function (global) {
  'use strict';

  var PRODUCTION = {
    gus: 'https://ledger-ai.netlify.app',
    muskrats: 'https://muskrats-io.netlify.app',
    fam: 'https://muskrats-io.netlify.app',
    agenticLoop: 'https://agentic-loop.netlify.app',
  };

  var LOCAL = {
    gus: 'http://127.0.0.1:8801',
    muskrats: 'http://127.0.0.1:8802',
    fam: 'http://127.0.0.1:8804',
    agenticLoop: 'http://127.0.0.1:8806',
  };

  function isLocalHost() {
    var host = global.location && global.location.hostname;
    return host === 'localhost' || host === '127.0.0.1';
  }

  function joinUrl(base, path) {
    if (!path || path === '/') {
      return base.replace(/\/$/, '') + '/';
    }
    var normalized = path.charAt(0) === '/' ? path : '/' + path;
    return base.replace(/\/$/, '') + normalized;
  }

  var urls = {
    production: PRODUCTION,
    local: LOCAL,
    isLocal: isLocalHost,
    base: function (service) {
      var map = isLocalHost() ? LOCAL : PRODUCTION;
      return map[service];
    },
    url: function (service, path) {
      return joinUrl(urls.base(service), path || '/');
    },
    applyDataLinks: function () {
      if (typeof document === 'undefined') {
        return;
      }
      document.querySelectorAll('[data-sc-service]').forEach(function (el) {
        var service = el.getAttribute('data-sc-service');
        var path = el.getAttribute('data-sc-path');
        if (path == null) {
          path = '/';
        }
        el.href = urls.url(service, path);
      });
    },
  };

  global.SOVEREIGN_CITY_URLS = urls;

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', urls.applyDataLinks);
    } else {
      urls.applyDataLinks();
    }
  }
})(typeof window !== 'undefined' ? window : this);
