import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Status";

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
    if (items.length === 0) return;
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
