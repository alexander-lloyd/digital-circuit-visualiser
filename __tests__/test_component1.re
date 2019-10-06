open Jest;
open Expect;
open ReactTestingLibrary;

open Component1;

test("Component renders", () =>
  <Component1 message="Hello World"></Component1>
  |> render
  |> container
  |> expect
  |> toMatchSnapshot
);