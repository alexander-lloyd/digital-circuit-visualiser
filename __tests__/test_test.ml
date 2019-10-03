open Jest

let () =

describe "Expect" (fun () ->
  let open Expect in

  test "toBe" (fun () ->
    expect (1 + 2) |> toBe 3);
);

