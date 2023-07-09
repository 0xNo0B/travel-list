function Item({ item, onDeletItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span
        style={
          item.packed ? { textDecoration: "line-through", color: "silver" } : {}
        }
      >
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeletItem(item.id)}>❌</button>
    </li>
  );
}
export default Item;
