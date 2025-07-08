import { useState, useEffect } from 'react';
import { useSelectionContext } from '../contexts/SelectionContext';
import type { Selection } from '../contexts/SelectionContext';

type ListBoxProps = {
  items: any[];
  defaultSelection?: any | null;
  height?: string;
  placeholder?: string;
};

export default function ListBox({ items=[], defaultSelection=null, height='300px', placeholder='Select an item'}: ListBoxProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const selected = useSelectionContext();

    if (!selected) {
        throw new Error('SelectionContext is undefined. Make sure ListBox is wrapped in a SelectionContextProvider.');
    }

    const changeSelection = (selection: Selection) => {
        selected.setSelection(selection);
    };

    useEffect(() => {
        setLoading(false);
    }, [items]);

    useEffect(() => {
        if (defaultSelection) {
            const selectedItem = items.find(item => item.id === defaultSelection);
            if (selectedItem) {
                const index = items.indexOf(selectedItem);
                setSelectedIndex(index);
                changeSelection({ selectionValue: selectedItem.id.toString(), selectionKey: index.toString() });
            }
        }
    }, [defaultSelection, items]);

    const handleItemClick = (item: any, index: number) => {
        setSelectedIndex(index);
        changeSelection({ 
            selectionValue: item.id.toString(), 
            selectionKey: index.toString() 
        });
    };

    return (
        <div className="listBoxContainer">
            <div className="listBox" style={{ height }}>
                {loading ? (
                    <div className="loadingItem">Loading Items...</div>
                ) : items.length === 0 ? (
                    <div className="emptyItem">{placeholder}</div>
                ) : (
                    items.map((item, index) => (
                        <div
                            key={item.id}
                            className={`listItem ${index === selectedIndex ? 'selected' : ''}`}
                            onClick={() => handleItemClick(item, index)}
                            onDoubleClick={() => {
                                // Dispatch view event on double-click
                                window.dispatchEvent(new CustomEvent('viewTask'));
                            }}
                        >
                            {item.name}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};