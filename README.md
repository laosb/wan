# Project WAN

A server / toolkit to normalize WeChat articles into plain webpages.

## Why

WeChat has built its own system of social networking, and facilitated their own
platform of web publishing. WeChat Public Platforms, are very popular among
Chinese netizens, thus we can't miss our audience on WeChat. WeChat articles are
basically made with HTML markups, but with very hard limits on external links,
embed content and actually you can't interact with this article outside WeChat's
ecosystem. With some "WeChat article editors"(e.g. Xiumi.us), most WeChat
articles have terrible HTML structures and markups, making it hard to be crawled
by search engines and webpage optimizers(like Telegram's Instant View).

## So What?

This project aims to capture, normalize, purify and serve WeChat articles into
standard webpages.

* **Capture**: capture the HTML and assets served by WeChat platform.
* **Normalize**: Remove `poweredby` and other useless attributes, unwrap elements
which was far too wrapped by elements, etc.
* **Purify**(optional): You may need much pure HTML documents. This process
reconstruct all elements basede on pure content. Only crucial styles will be
preserved, like `text-align`. Decorational widgets & tiny images removed.
* **Serve**(optional): You may want to push your WeChat articles to your website,
and style them with your website's styles. No problem.

## Status

In progress. Don't push me too hard.

## Legal

This project itself is licensed under MIT. We don't touch with the content you've
extracted by this project. Use this at your own risk.
