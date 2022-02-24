export const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="treemap-custom-tooltip">
        <p>{`${payload[0].payload.name} : $${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }

  return null;
};
