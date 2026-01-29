// ==UserScript==
// @name         No AI Overview - Append -ai to Google Search
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically adds "-ai" to every Google search to prevent AI Overview from appearing
// @author       You
// @match        https://www.google.com/search*
// @match        https://google.com/search*
// @icon         https://www.google.com/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const url = new URL(window.location.href);
  const queryParam = url.searchParams.get("q");

  // No query or empty query - do nothing
  if (!queryParam || !queryParam.trim()) {
    return;
  }

  const trimmed = queryParam.trim();
  // Already ends with -ai (with or without space) - avoid redirect loop
  if (/\s+-ai\s*$/i.test(trimmed) || /^-ai\s*$/i.test(trimmed)) {
    return;
  }

  // Append " -ai" to the query and redirect
  const newQuery = trimmed + " -ai";
  url.searchParams.set("q", newQuery);
  window.location.replace(url.toString());
})();
