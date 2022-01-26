import React from "react";
import _ from "lodash";

export function Zerion(props) {
  const { portfolio } = props;
  const data = React.useMemo(() => portfolio, [portfolio]);

  return (
    <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
}
