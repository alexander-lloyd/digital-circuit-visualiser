<p align="center">
  <h3 align="center">Final Year Project</h3>

  <p align="center">
    Final Year Project 
    <br />
    <a href="https://alexander-lloyd.github.io/fyp"><strong>View the WebApp »</strong></a>
</p>

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [License](#license)
* [Contact](#contact)

## About The Project

### Built With
* [ReasonML](http://reasonml.github.io/)
* [React](https://reactjs.org/)

## Getting Started

To get started, clone the repository.

```sh
$ git clone git@github.com:alexander-lloyd/fyp.git
```

### Prerequisites

* nodejs: Follow the instructions on the (NodeJS website)[https://nodejs.org/en/]

* yarn
```sh
npm install -g yarn
```

### Installation

Install dependencies.

```sh
$ yarn
```

## Usage

```
$ yarn start
$ yarn webpack
```

To run with the webpack development server run `npm run server` and view in the browser at http://localhost:8000. Running in this environment provides hot reloading and support for routing; just edit and save the file and the browser will automatically refresh.

Note that any hot reload on a route will fall back to the root (`/`), so `ReasonReact.Router.dangerouslyGetInitialUrl` will likely be needed alongside the `ReasonReact.Router.watchUrl` logic to handle routing correctly on hot reload refreshes or simply opening the app at a URL that is not the root.

To use a port other than 8000 set the `PORT` environment variable (`PORT=8080 npm run server`).

After you see the webpack compilation succeed (the `npm run webpack` step), open up `build/index.html` (**no server needed!**). Then modify whichever `.re` file in `src` and refresh the page to see the changes.

## Build for Production

```sh
npm run clean
npm run build
npm run webpack:production
```

This will replace the development artifact `build/Index.js` for an optimized version as well as copy `src/index.html` into `build/`. You can then deploy the contents of the `build` directory (`index.html` and `Index.js`).

If you make use of routing (via `ReasonReact.Router` or similar logic) ensure that server-side routing handles your routes or that 404's are directed back to `index.html` (which is how the dev server is set up).

**To enable dead code elimination**, change `bsconfig.json`'s `package-specs` `module` from `"commonjs"` to `"es6"`. Then re-run the above 2 commands. This will allow Webpack to remove unused code.

## Roadmap

To be decided.

## License

Unsure what License this will be relased under.

## Contact

- Project Link: [https://github.com/alexander-lloyd/fyp](https://github.com/alexander-lloyd/fyp)
- LinkedIn: [![LinkedIn][linkedin-shield]][linkedin-url]

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/alexander-lloyd
