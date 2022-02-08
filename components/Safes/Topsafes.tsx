import React from "react";
import { useSubgraph } from "../../hooks/useSubgraph";

export default function Topsafes(props) {
  const graphData = useSubgraph();
  const data = React.useMemo(() => graphData, [graphData]);
  useSubgraph();
  return (
    <>
      <pre>
        <code>{JSON.stringify(graphData, null, 2)}</code>
      </pre>
    </>
  );
}
