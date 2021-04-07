import React, { useState } from 'react';

import './Items.scss';
import { List } from '@material-ui/core';

import Item from '../Item';
import { IItem } from '../../services/itemsService';

interface IItemsProps {
  items: IItem[];
  editItem: (item: IItem) => void;
  deleteItem: (id: number) => void;
}

const Items: React.FC<IItemsProps> = ({ items, deleteItem, editItem }) => {
  const [selectedItem, setSelectedItem] = useState<string>('');
  return (
    <List className="items" component="nav">
      {items.map((item: IItem) => (
        <Item
          item={item}
          selectedItem={selectedItem}
          key={item.id}
          deleteItem={deleteItem}
          editItem={editItem}
          setSelectedItem={setSelectedItem}
        />
      ))}
    </List>
  );
};
export default Items;
