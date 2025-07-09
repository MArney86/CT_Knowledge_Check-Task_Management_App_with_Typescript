import { useState, useEffect } from 'react';
import { useSelectionContext } from '../contexts/SelectionContext';
import type { Selection } from '../contexts/SelectionContext';

//define the props for the ListBox component
type ListBoxProps = {
  items: any[];
  defaultSelection?: any | null;
  height?: string;
  placeholder?: string;
};

//ListBox component definition
export default function ListBox({ items=[], defaultSelection=null, height='300px', placeholder='Select an item'}: ListBoxProps) {
    //state to manage loading, selected index, and selection context
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const selected = useSelectionContext();

    //ensure that the selection context is available
    if (!selected) {
        throw new Error('SelectionContext is undefined. Make sure ListBox is wrapped in a SelectionContextProvider.');
    }

    //function to change the selection in the context
    const changeSelection = (selection: Selection) => {
        selected.setSelection(selection);
    };

    //effect to set loading state to false when items are loaded
    useEffect(() => {
        setLoading(false);
    }, [items]);

    //effect to set default selection if provided
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

    //function to handle item click and update selection
    const handleItemClick = (item: any, index: number) => {
        setSelectedIndex(index);
        changeSelection({ 
            selectionValue: item.id.toString(), 
            selectionKey: index.toString() 
        });
    };

    return (
        //render the generic list box with items
        <div className="listBoxContainer">
            <div className="listBox" style={{ height }}>
                {//render loading, empty, or item states
                loading ? (
                    <div className="loadingItem">Loading Items...</div>
                ) : items.length === 0 ? (
                    <div className="emptyItem">{placeholder}</div>
                ) : (
                    /*loop over items and generate list entries with event handlers*/
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