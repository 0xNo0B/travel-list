function Stats({ numberOfItems }) {
  if (!numberOfItems.length)
    return (
      <p className="stats">
        <em>Start adding some items to you packing list🔥</em>
      </p>
    );
  const numItem = numberOfItems.length;
  const numPacked = numberOfItems.filter((item) => item.packed).length;
  const precentage = Math.round((numPacked / numItem) * 100);

  return (
    <footer className="stats">
      <em>
        {" "}
        {precentage === 100
          ? "You got everything! ready to go ✈️"
          : `💼You have ${numItem} items on your list, and you already packed ${numPacked} (${precentage}%)${" "}`}{" "}
      </em>
    </footer>
  );
}

export default Stats;
