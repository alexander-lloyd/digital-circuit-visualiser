// Webpack picks this up in the next stage of building.
[%bs.raw {|require('./app.scss')|}];

ReactDOMRe.renderToElementWithId(<Component1 message="Hello! Click this text." />, "app");
