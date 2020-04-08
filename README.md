<p align="center">
  <h3 align="center">Digital Circuit Visualiser</h3>

  <p align="center">
    Final Year Project
    <br />
    <a href="https://alexander-lloyd.github.io/digital-circuit-visualiser"><strong>View the WebApp »</strong></a>
</p>

![Build](https://github.com/alexander-lloyd/digital-circuit-visualiser/workflows/Build/badge.svg)
[![codecov](https://codecov.io/gh/alexander-lloyd/digital-circuit-visualiser/branch/master/graph/badge.svg?token=7liikH1rI6)](https://codecov.io/gh/alexander-lloyd/digital-circuit-visualiser)

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Installation](#installation)
* [Usage](#usage)
* [Tests](#tests)
* [Contact](#contact)

## About The Project

This project is a circuit visualiser that uses a structural based
approach (similar to monoidal categories) to represent circuit.
The advantages of this are that structure in the algebraic form
is preserved into the visualisation. New optimisation
techniques are possible with monoidal categories.

This project includes a custom programming language similar to the
algebraic representation of monoidal categories and then visualises
them.

### Built With
* [TypeScript](https://typescriptlang.org/)
* [React](https://reactjs.org/)
* [Webpack](https://webpack.js.org/)
* [SASS](https://sass-lang.com/)


## Getting Started

Ensure you have the necessary dependencies:

* Nodejs: Follow the instructions on the [NodeJS website](https://nodejs.org/)
* Yarn package manager (`npm install -g yarn`). [Yarn Website](https://yarnpkg.com/)

To get started, clone the repository and then install dependencies.

```sh
$ git clone git@github.com:alexander-lloyd/digital-circuit-visualiser.git
```

### Installation

Install dependencies.

```sh
$ yarn install
```

## Usage

```sh
$ yarn start
```

To run with the Webpack development server run `yarn start` and view
in the browser at http://localhost:8000. Running in this environment
provides hot reloading support; edit and save the file, and the
browser will automatically refresh.

To use a port other than 8000 set the `PORT` environment variable 
(`PORT=8080 yarn start`).

## Building

To build and bundle the application run:

```sh
$ yarn build
```

After you see the Webpack compilation succeed (the `yarn build`
step), open up `build/index.html` in your browser.

## Tests

Run all of the unit tests with:

```sh
$ yarn test
```

## Build for Production

```sh
$ yarn clean
$ yarn build:production
```

This step will replace the development artifact `build/index.js` for an optimised version as well as copy `src/index.html` into `build/`. 
You can then deploy the contents of the `build` directory.


## Contact

- Project Link: [https://github.com/alexander-lloyd/digital-circuit-visualiser](https://github.com/alexander-lloyd/digital-circuit-visualiser)
- LinkedIn: [![LinkedIn][linkedin-shield]][linkedin-url]

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/alexander-lloyd
