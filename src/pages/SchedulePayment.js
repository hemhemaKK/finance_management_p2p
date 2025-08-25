export default function BudgetPlan() {
  return (
    <div style={cardStyle}>
      <h3>Budget Plan</h3>
      <p>Track your budget and spending here.</p>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "white",
  borderRadius: "15px",
  padding: "2rem",
  boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
};
