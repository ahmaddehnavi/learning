<?php
/*
 * Copyright 2012 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Implement the caching directives specified in rfc2616. This
 * implementation is guided by the guidance offered in rfc2616-sec13.
 * @author Chirag Shah <chirags@google.com>
 */
class Google_CacheParser
{
	public static $CACHEABLE_HTTP_METHODS = array('GET', 'HEAD');
	public static $CACHEABLE_STATUS_CODES = array('200', '203', '300', '301');

	private function __construct()
	{
	}

	/**
	 * Check if an HTTP request can be cached by a private local cache.
	 *
	 * @static
	 * @param Google_HttpRequest $resp
	 * @return bool True if the request is cacheable.
	 * False if the request is uncacheable.
	 */
	public static function isRequestCacheable(Google_HttpRequest $resp)
	{
		$method = $resp->getRequestMethod();
		if (!in_array($method, self::$CACHEABLE_HTTP_METHODS)) {
			return FALSE;
		}

		// Don't cache authorized requests/responses.
		// [rfc2616-14.8] When a shared cache receives a request containing an
		// Authorization field, it MUST NOT return the corresponding response
		// as a reply to any other request...
		if ($resp->getRequestHeader("authorization")) {
			return FALSE;
		}

		return TRUE;
	}

	/**
	 * Check if an HTTP response can be cached by a private local cache.
	 *
	 * @static
	 * @param Google_HttpRequest $resp
	 * @return bool True if the response is cacheable.
	 * False if the response is un-cacheable.
	 */
	public static function isResponseCacheable(Google_HttpRequest $resp)
	{
		// First, check if the HTTP request was cacheable before inspecting the
		// HTTP response.
		if (FALSE == self::isRequestCacheable($resp)) {
			return FALSE;
		}

		$code = $resp->getResponseHttpCode();
		if (!in_array($code, self::$CACHEABLE_STATUS_CODES)) {
			return FALSE;
		}

		// The resource is uncacheable if the resource is already expired and
		// the resource doesn't have an ETag for revalidation.
		$etag = $resp->getResponseHeader("etag");
		if (self::isExpired($resp) && $etag == FALSE) {
			return FALSE;
		}

		// [rfc2616-14.9.2]  If [no-store is] sent in a response, a cache MUST NOT
		// store any part of either this response or the request that elicited it.
		$cacheControl = $resp->getParsedCacheControl();
		if (isset($cacheControl['no-store'])) {
			return FALSE;
		}

		// Pragma: no-cache is an http request directive, but is occasionally
		// used as a response header incorrectly.
		$pragma = $resp->getResponseHeader('pragma');
		if ($pragma == 'no-cache' || strpos($pragma, 'no-cache') !== FALSE) {
			return FALSE;
		}

		// [rfc2616-14.44] Vary: * is extremely difficult to cache. "It implies that
		// a cache cannot determine from the request headers of a subsequent request
		// whether this response is the appropriate representation."
		// Given this, we deem responses with the Vary header as uncacheable.
		$vary = $resp->getResponseHeader('vary');
		if ($vary) {
			return FALSE;
		}

		return TRUE;
	}

	/**
	 * @static
	 * @param Google_HttpRequest $resp
	 * @return bool True if the HTTP response is considered to be expired.
	 * False if it is considered to be fresh.
	 */
	public static function isExpired(Google_HttpRequest $resp)
	{
		// HTTP/1.1 clients and caches MUST treat other invalid date formats,
		// especially including the value “0”, as in the past.
		$parsedExpires   = FALSE;
		$responseHeaders = $resp->getResponseHeaders();
		if (isset($responseHeaders['expires'])) {
			$rawExpires = $responseHeaders['expires'];
			// Check for a malformed expires header first.
			if (empty($rawExpires) || (is_numeric($rawExpires) && $rawExpires <= 0)) {
				return TRUE;
			}

			// See if we can parse the expires header.
			$parsedExpires = strtotime($rawExpires);
			if (FALSE == $parsedExpires || $parsedExpires <= 0) {
				return TRUE;
			}
		}

		// Calculate the freshness of an http response.
		$freshnessLifetime = FALSE;
		$cacheControl      = $resp->getParsedCacheControl();
		if (isset($cacheControl['max-age'])) {
			$freshnessLifetime = $cacheControl['max-age'];
		}

		$rawDate    = $resp->getResponseHeader('date');
		$parsedDate = strtotime($rawDate);

		if (empty($rawDate) || FALSE == $parsedDate) {
			$parsedDate = time();
		}
		if (FALSE == $freshnessLifetime && isset($responseHeaders['expires'])) {
			$freshnessLifetime = $parsedExpires - $parsedDate;
		}

		if (FALSE == $freshnessLifetime) {
			return TRUE;
		}

		// Calculate the age of an http response.
		$age = max(0, time() - $parsedDate);
		if (isset($responseHeaders['age'])) {
			$age = max($age, strtotime($responseHeaders['age']));
		}

		return $freshnessLifetime <= $age;
	}

	/**
	 * Determine if a cache entry should be revalidated with by the origin.
	 *
	 * @param Google_HttpRequest $response
	 * @return bool True if the entry is expired, else return false.
	 */
	public static function mustRevalidate(Google_HttpRequest $response)
	{
		// [13.3] When a cache has a stale entry that it would like to use as a
		// response to a client's request, it first has to check with the origin
		// server to see if its cached entry is still usable.
		return self::isExpired($response);
	}
}