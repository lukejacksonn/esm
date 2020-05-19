# esm

> A prototyping tool for single file es modules

The motivation here was to create a single page app like [codesandbox](https://codesandbox.io) – which is commonly used to prototype and demo Javascript code – but with no bundle/transpile overhead, a massively simplified UI and no real features (yet). The application itself is a frontend only static web app with no build step and is hosted on Github pages.

You write code, you hit save, you see it render.

---

![esm](https://user-images.githubusercontent.com/1457604/55997008-24549300-5cb1-11e9-9041-4af005a99828.gif)

## Features

- 🎨 Syntax highlighted code editor inputs
- ♻️ Rebuilds almost instantaneously on save
- 🌍 Serializable state encoded into shareable URLs
- 📦 Import npm packages straight from unpkg or pika CDN
- 💻 Minimal UI puts focus on the code
- 🗜 Super light weight – almost no dependencies

## Usage

To use the web interface simply visit https://esm.codes and start typing. After making changes hit save (`cmd+s`). The inputted code will be evaluated and the results of which will appear in the simulated device to the right.

The code you input is are stored in state which is serialised using the browsers `atob` function and set as the `location.hash`. This happens every time a change in the code occurs. That means you can share your creation with anyone by just copy pasting the window URL.

## Development

If you would like to develop the project, first clone this repo then run the following command in your terminal (from the project root directory) which will open the app in your preferred browser.

```
$ npx servor
```

> Live reload is enabled by default with [servor](https://github.com/lukejacksonn/servor) so when you make changes to your code the browser will reload the tab and your changes will be reflected there.

### es-react

This project uses a proprietary version of react called [`es-react`](https://github.com/lukejacksonn/es-react) which allows you to import `React` and `ReactDOM` (version 16.8.3) as an es module from within your app and component files.

```js
import { React, ReactDOM } from 'https://unpkg.com/es-react'
```

## Implementation

Evaluating and executing JavaScript in the browser is not a novel concept and is made possible by using `eval` or an `iframe` the latter of which is employed here because it can parse ES module syntax and offers a sandboxed DOM.

The iframe `src` is set to a data url that represents a base64 encoding of the editor contents wrapped in a script tag – with type `module`. This is how it looks:

```js
<iframe
  src={`data:text/html;base64,${btoa(
    `<script type="module">${code}</script>`
  )}`}
/>
```

## Todo

I would like the app to remain simple with very focussed scope but I am interested in:

- Adding a URL bar to the simulator device
- Experimenting with compressing the base64 strings

I am not interested in:

- Rewriting the project in TypeScript
- Adding Babel or Webpack (or any build step for that matter)

Although I am currently quite busy with work I will try take the time to review PRs that address these todos.
