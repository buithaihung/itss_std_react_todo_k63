import { useState, useEffect } from 'react';

/* ライブラリ */
import { addFirebaseItem, updateFirebaseItem, getFirebaseItems, clearFirebaseItem } from "../lib/firebase";

function useFbStorage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, [items]);

  const getItems = async () => {
    const _items = await getFirebaseItems();
    setItems(_items);
  };

  const addItem = async item => {
    const newItem = { text: item.text, done: item.done };
    await addFirebaseItem(newItem);
    setItems([...items, newItem]);
  };

  const updateItem = async checked => {
    const changes = { done: !checked.done };
    await updateFirebaseItem(changes, checked.id);
    const newItems = items.map((item) => {
      if (item.id === checked.id) {
        item = { ...item, changes}
      }
      return item;
    })
    setItems(newItems);
  }

  const clearItems = () => {
    items.map(item => {
      clearFirebaseItem(item);
    })
    setItems([]);
  };

  return [items, addItem, updateItem, clearItems];
}

export default useFbStorage;