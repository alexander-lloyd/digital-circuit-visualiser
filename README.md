<p align="center">
  <h3 align="center">Final Year Project</h3>

  <p align="center">
    Final Year Project 
    <br />
    <a href="https://alexander-lloyd.github.io/digital-circuit-visualiser"><strong>View the WebApp »</strong></a>
</p>

![Build](https://github.com/alexander-lloyd/
/workflows/Build/badge.svg)
[![codecov](https://codecov.io/gh/alexander-lloyd/digital-circuit-visualiser/branch/master/graph/badge.svg?token=7liikH1rI6)](https://codecov.io/gh/alexander-lloyd/digital-circuit-visualiser)

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Tests](#tests)
* [Contact](#contact)

## About The Project

### Built With
* [TypeScript](https://typescriptlang.org/)
* [React](https://reactjs.org/)
* [Webpack](https://webpack.js.org/)
* [SASS](https://sass-lang.com/)

## Getting Started

To get started, clone the repository.

```sh
$ git clone git@github.com:alexander-lloyd/digital-circuit-visualiser.git
```

### Prerequisites

* nodejs: Follow the instructions on the [NodeJS website](https://nodejs.org/)

* yarn package manager
```sh
npm install -g yarn
```

### Installation

Install dependencies.

```sh
$ yarn
```

## Usage

```sh
$ yarn start
```

To run with the webpack development server run `yarn start` and view in the browser at http://localhost:8000. Running in this environment provides hot reloading support; just edit and save the file and the browser will automatically refresh.

To use a port other than 8000 set the `PORT` environment variable (`PORT=8080 yarn start`).

## Building

```sh
$ yarn build
```

After you see the webpack compilation succeed (the `yarn build` step), open up `build/index.html` (**no server needed!**).

## Tests

```sh
yarn test
```

This will run the jest unit tests.

## Build for Production

```sh
npm run clean
npm run build
npm run webpack:production
```

This will replace the development artifact `build/index.js` for an optimized version as well as copy `src/index.html` into `build/`. You can then deploy the contents of the `build` directory (`index.html` and `index.js`).

## Contact

- Project Link: [https://github.com/alexander-lloyd/digital-circuit-visualiser](https://github.com/alexander-lloyd/digital-circuit-visualiser)
- LinkedIn: [![LinkedIn][linkedin-shield]][linkedin-url]

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/alexander-lloyd
