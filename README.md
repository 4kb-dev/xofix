# xofix

[Cloudflare Worker](https://workers.cloudflare.com/) for requesting any resource with the [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) header.

Overcomes the issue in client browsers while using a resource that throws [CORS errors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors). This can be used for all kind of resources including any API requests.

#### Features
- CORS header to any resource requests
- Supports `OPTIONS` [preflight request](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request) checks
- Auto setting correct `Content-Type` header
- Resource loading directly from any GitHub repository

## Usage

Pass the [`encoded`](https://developer.mozilla.org/en-us/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) resource url as the `url` param which you would like to fetch with the CORS header.

###### `https://xofix.4kb.dev/?url=YOUR_RESOURCE_URL`


#### Images

```html
<img src="https://xofix.4kb.dev/?url=YOUR_IMAGE_URL" />
```

#### Stylesheets

```html
<link rel="stylesheet" href="https://xofix.4kb.dev/?url=YOUR_CSS_URL" crossorigin="anonymous" />
```

#### Fonts

```css
@font-face {
  font-family: 'Awesome Family';
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url("https://xofix.4kb.dev/?url=YOUR_FONT_URL.eot");
  src: url("https://xofix.4kb.dev/?url=YOUR_FONT_URL.woff2") format("woff2"), url("https://xofix.4kb.dev/?url=YOUR_FONT_URL.woff") format("woff"), url("https://xofix.4kb.dev/?url=YOUR_FONT_URL.ttf") format("truetype");
}

```

#### API calls
```js
fetch('https://xofix.4kb.dev/?url=YOUR_API_URL', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({key: 'value'}),
})
```

#### Auto set `content-type` header

You can pass the `set_content_type=true` query parameter to auto set the `content-type` header based on the file extension determined from the url. This is useful for cases where the file might be served from a static text storage with the default `content-type: text/plain; charset=utf-8` header and we need the appropriate content type headers for making use of the file in the client browser.

Example:

The following auto sets the `content-type: text/css; charset=utf-8` header if the url ends with `.css` extension.

```
https://xofix.4kb.dev/?url=YOUR_CSS_URL.css&set_content_type=true
```

#### GitHub repositories

To load resources directly from a github repository, use the base url `https://xofix.4kb.dev/github` and append the Github raw url of the file you want to load.

Steps
- Navigate to the branch or tag and then to the file that you would like to load
- Click on the `Raw` button
- Copy the url path after the `https://raw.githubusercontent.com`
- Append this path after the `https://xofix.4kb.dev/github` to get your final url

Example:

```
https://xofix.4kb.dev/github/emadalam/atvjs/v0.2.9/dist/atv.js
```

*Note: For the files loaded from GitHub, the `content-type` header is always set automatically based on the file extension, no flag needs to be specified. This is to ensure easier integrations as the files served from the GitHub raw urls never has the correct content type header.*

## Development

Check out [CloudFlare Workers documentation](https://developers.cloudflare.com/workers/) to get started and install/configure the necessary tools.

```shell
npm i
npm run dev

# npm run dev --env staging
```

## Publish

###### Staging

```
npm run publish-staging
```

###### Production

```
npm run publish-production
```

## TODO
- Website for explanation and url creation using [Worker Sites](https://developers.cloudflare.com/workers/platform/sites)
- Sentry for error reporting
- Unit tests

## License
`xofix` is licensed under the [MIT License](https://opensource.org/licenses/MIT)