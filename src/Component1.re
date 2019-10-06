[@react.component]
let make = (~message) => {
  let (count, setCount) = React.useState(() => 0);

  <div>
    { ReasonReact.string(message) }
    { ReasonReact.string("You clicked " ++ string_of_int(count) ++ " times")}
    <button className="button" onClick={_ => setCount(_ => count + 1)}>{ ReasonReact.string("Increment") }</button>
    <button className="button" onClick={_ => setCount(_ => count - 1)}>{ ReasonReact.string("Decrement") }</button>
  </div>
}