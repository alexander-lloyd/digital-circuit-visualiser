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

  test("increments counter", () => {
    let shallow = Enzyme.shallow(<Component1 message="Hello World"></Component1>);

    let button = shallow
    |> Enzyme.Shallow.find("button")
    |> Enzyme.Shallow.first;

    button |> Enzyme.Shallow.simulate("click");

    shallow
    |> Enzyme.Shallow.find("div")
    |> Enzyme.Shallow.first
    |> Enzyme.Shallow.text
    |> expect
    |> toContainString("1")
  });

  test("decrement counter", () => {
    let shallow = Enzyme.shallow(<Component1 message="Hello World"></Component1>);

    let button = shallow
    |> Enzyme.Shallow.find("button")
    |> Enzyme.Shallow.last;

    button |> Enzyme.Shallow.simulate("click");

    shallow
    |> Enzyme.Shallow.find("div")
    |> Enzyme.Shallow.first
    |> Enzyme.Shallow.text
    |> expect
    |> toContainString("-1")
  })
});