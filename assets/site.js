/* Mobile navigation toggle */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* "Follow" button on small screens shows/hides the author links */
  var follow = document.querySelector('.author-follow');
  var links = document.querySelector('.author-links');
  if (follow && links) {
    follow.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      follow.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();

/* --------------------------------------------------------------------------
   Publications: load automatically from the public ORCID API.
   Only runs on pages that contain <div id="pub-list" data-orcid="...">.
   If the request fails, the static list already in the HTML stays visible.
   -------------------------------------------------------------------------- */
(function () {
  var box = document.getElementById('pub-list');
  if (!box) return;
  var orcid = box.getAttribute('data-orcid');
  if (!orcid) return;

  fetch('https://pub.orcid.org/v3.0/' + orcid + '/works', {
    headers: { Accept: 'application/json' }
  })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) {
      var groups = (data && data.group) || [];
      var works = groups.map(function (g) {
        var summaries = g['work-summary'] || [];
        // prefer the summary that carries a journal title
        var s = summaries.find(function (x) { return x['journal-title'] && x['journal-title'].value; }) || summaries[0];
        if (!s) return null;
        var ids = (g['external-ids'] && g['external-ids']['external-id']) || [];
        var doi = ids.find(function (i) { return i['external-id-type'] === 'doi'; });
        var url = doi ? 'https://doi.org/' + doi['external-id-value'] : (s.url && s.url.value) || null;
        return {
          title: (s.title && s.title.title && s.title.title.value) || 'Untitled',
          year: (s['publication-date'] && s['publication-date'].year && s['publication-date'].year.value) || '',
          journal: (s['journal-title'] && s['journal-title'].value) || '',
          type: (s.type || '').replace(/-/g, ' ').toLowerCase(),
          url: url
        };
      }).filter(Boolean);

      if (!works.length) return;
      works.sort(function (a, b) { return (b.year || 0) - (a.year || 0); });

      var html = '';
      var currentYear = null;
      works.forEach(function (w, idx) {
        if (w.year !== currentYear) {
          if (idx > 0) html += '</ul>';
          currentYear = w.year;
          html += '<h2 class="pub-year">' + (w.year || 'Undated') + '</h2><ul class="entries">';
        }
        html += '<li>' +
          (w.url ? '<a class="entry-title" href="' + w.url + '" target="_blank" rel="noopener">' + escapeHtml(w.title) + '</a>'
                 : '<span class="entry-title">' + escapeHtml(w.title) + '</span>') +
          '<span class="entry-meta">' + escapeHtml(w.journal) + (w.journal && w.type ? ' — ' : '') + escapeHtml(w.type) + '</span>' +
          '</li>';
      });
      html += '</ul>';

      box.innerHTML = html;
      var note = document.getElementById('pub-source');
      if (note) note.textContent = 'List generated automatically from ORCID (' + works.length + ' records).';
    })
    .catch(function () { /* keep the static fallback list */ });

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
})();
