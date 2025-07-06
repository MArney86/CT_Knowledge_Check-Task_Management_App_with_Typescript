import { useState, useEffect, type JSX } from 'react';
import { useSelectionContext } from '../contexts/SelectionContext';
import type { Selection } from '../contexts/SelectionContext';

type ListBoxProps = {
  items: any[];
  defaultSelection?: any | null;
  height?: string;
  placeholder?: string;
};

export default function ListBox({ items=[], defaultSelection=null, height='300px', placeholder='Select an item'}: ListBoxProps) {
    const [listState, setListState] = useState<JSX.Element[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const selected = useSelectionContext();

    if (!selected) {
        throw new Error('SelectionContext is undefined. Make sure ListBox is wrapped in a SelectionContextProvider.');
    }

    const changeSelection = (selection: Selection) => {
        selected.setSelection(selection);
    };

    useEffect(() => {
        if (items.length === 0) {
            setLoading(false);
            return;
        }

        const itemsHTML: JSX.Element[] = items.map((item, index) => {
            return (<option key={index} value={item.id}>{item.name}</option>);
        });

        setListState(itemsHTML);
        setLoading(false);
    }, [items]);

    useEffect(() => {
        if (defaultSelection) {
            const selectedItem = items.find(item => item.id === defaultSelection);
            if (selectedItem) {
                changeSelection({ selectionValue: selectedItem.id, selectionKey: items.indexOf(selectedItem).toString() });
            }
        }
    }, [defaultSelection]);

  return (
    <div className="list-box-container">
        <div className="list-box">
            <select id="list-box-select" name="list-box-select" style={{ height }} onClick={(e) => {
                const target = e.target as HTMLSelectElement;
                changeSelection({ selectionValue: target.value, selectionKey: items.indexOf(items.find(item => item.id === target.value)).toString() });
            }}>
            <option value="" disabled>{placeholder}</option>
            {loading ? <option value="" disabled>Loading Items...</option> : listState}
            </select>
        </div>
    </div>
  );
};