import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "chrger", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleClearItems() {
    const ask = window.confirm("Do you Want to Clear all the list? ❌❌");
    if (!ask) return;
    setItems((item) => []);
  }

  function handleDeleteItem(id) {
    console.log(id);
    setItems((items) => items.filter((items) => items.id !== id));
  }

  function handleToggleItem(id) {
    setItems((item) =>
      item.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeletItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClear={handleClearItems}
      />
      <Stats numberOfItems={items} />
    </div>
  );
}

function Logo() {
  return <h1>💪 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip? </h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>add</button>
    </form>
  );
}

function PackingList({ items, onDeletItem, onToggleItem, onClear }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "descrition")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul className="list">
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeletItem={onDeletItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input"> Sort by inpu order</option>
          <option value="descrition">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClear}>Clear lis</button>
      </div>
    </div>
  );
}

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
