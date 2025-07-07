import { useState, useEffect, type JSX } from 'react';
import { useSelectionContext } from '../contexts/SelectionContext';
import type { Selection } from '../contexts/SelectionContext';
import styles from './ListBox.module.css';

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
            return (<option key={index} value={item.id} className={styles.option}>{item.name}</option>);
        });

        setListState(itemsHTML);
        setLoading(false);
    }, [items]);

    useEffect(() => {
        if (defaultSelection) {
            const selectedItem = items.find(item => item.id === defaultSelection);
            if (selectedItem) {
                changeSelection({ selectionValue: selectedItem.id.toString(), selectionKey: items.indexOf(selectedItem).toString() });
            }
        }
    }, [defaultSelection]);

  return (
    <div className={styles.listBoxContainer}>
        <div className={styles.listBox}>
            <select 
                id="list-box-select" 
                name="list-box-select" 
                className={styles.select}
                style={{ height }} 
                onChange={(e) => {
                    const target = e.target as HTMLSelectElement;
                    const selectedItem = items.find(item => item.id.toString() === target.value);
                    if (selectedItem) {
                        changeSelection({ 
                            selectionValue: selectedItem.id.toString(), 
                            selectionKey: items.indexOf(selectedItem).toString() 
                        });
                    }
                }}
            >
                <option value="" disabled className={styles.option}>{placeholder}</option>
                {loading ? (
                    <option value="" disabled className={styles.option}>Loading Items...</option>
                ) : (
                    listState
                )}
            </select>
        </div>
    </div>
  );
};