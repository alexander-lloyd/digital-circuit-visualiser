open Jest;
open Expect;
open ReactTestingLibrary;

open Component1;

Enzyme.configureEnzyme(Enzyme.react_16_adapter());

describe("Component 1", () => {
  test("matches snapshot", () =>
    <Component1 message="Hello World"></Component1>
    |> render
    |> container
    |> expect
    |> toMatchSnapshot
  );

  test("has two buttons", () =>
    Enzyme.shallow(<Component1 message="Hello World"></Component1>)
    |> Enzyme.Shallow.find("button")
    |> Enzyme.Shallow.length
    |> expect
    |> toBe(2)
  )
});