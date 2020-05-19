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

To use the web interface simply visit https://esm.codes and start typing. The inputted code will be evaluated and run in the simulated device.

The code you input is stored in state which is serialised using the browsers `atob` function and set as the `location.hash`. This happens every time a change in the code occurs. That means you can share your creation with anyone by just copy pasting the window URL.

## Development

If you would like to develop the project, first clone this repo then run the following command in your terminal (from the project root directory) which will open the app in your preferred browser and code editor.

```
$ npx servor --editor --browse --reload
```

> Live reload is enabled by with [servor](https://github.com/lukejacksonn/servor) so when you make changes to your code the browser will reload the tab and your changes will be reflected there.

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
