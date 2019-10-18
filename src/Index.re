// Webpack picks this up in the next stage of building.
[%bs.raw {|require('./app.scss')|}];

ReactDOMRe.renderToElementWithId(<Layout />, "app");
