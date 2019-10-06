open Jest;
open Expect;
open ReactTestingLibrary;

open Component1;


describe("Component 1", () =>
  test("matches snapshot", () =>
    <Component1 message="Hello World"></Component1>
    |> render
    |> container
    |> expect
    |> toMatchSnapshot
  )
);
