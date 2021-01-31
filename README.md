# xofix

[Cloudflare Worker](https://workers.cloudflare.com/) for requesting any resource with the [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) header.

Overcomes the issue in client browsers while using any resource that throws [CORS errors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors). This can be used for any kind of resources including any API requests.

## Usage

Pass the [`encoded`](https://developer.mozilla.org/en-us/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) resource url as the `url` param that you would like to fetch with the CORS header.

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