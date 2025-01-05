import React, { useState } from 'react';


type ChecklistProps = {
  items: string[];
  name: string
};

const Checklist: React.FC<ChecklistProps> = ({items, name }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleChange = (item: string) => {
    const updatedSelection = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];

    setSelectedItems(updatedSelection);
  };

  return (
    <div>
      <h3>{name}</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                value={item}
                checked={selectedItems.includes(item)}
                onChange={() => handleChange(item)}
              />
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checklist;