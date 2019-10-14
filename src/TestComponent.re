[@react.component]
let make = () => {
    let data = [1,2,3];
    let arrayData = Belt.List.toArray(data);
    let d3Ref = React.useRef(Js.Nullable.null);

    React.useEffect(() => {
      let svg = D3.select("#chart");

      let update = svg
        |. D3.Selection.append("g")
        |. D3.Selection.selectAll("text")
        |. D3.Selection.data(arrayData);

      update
        |. D3.Selection.enter
        |. D3.Selection.append("text")
        |. D3.Selection.attrFn("x", (_, i, _) => i * 25)
        |. D3.Selection.attr("y", 40)
        |. D3.Selection.style("font-size", "24")
        |. D3.Selection.textFn(d => d);

      update
        |. D3.Selection.attrFn("x", (_, i, _) => i * 40)
        |. D3.Selection.textFn(d => d);
    
      update
        |. D3.Selection.exit
        |. D3.Selection.remove;

      Some(() => ());
    });

    <svg
      id="chart"
      className="d3-component"
      width="400"
      height="200"
    />
}