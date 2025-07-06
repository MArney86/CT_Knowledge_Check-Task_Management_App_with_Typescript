import React from 'react';

// Define the selection object type
interface Selection {
    selectionValue: string;
    selectionKey?: string;
}

// Define the context value type
interface SelectionContextType {
  selection: Selection;
  setSelection: (selection: Selection) => void;
}

// Create context with proper typing and default values
const SelectionContext = React.createContext<SelectionContextType>({
  selection: { selectionValue: '', selectionKey: '' },
  setSelection: () => {}
});

// Provider component that manages selection state
export const SelectionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selection, setSelection] = React.useState<Selection>({
    selectionValue: '',
    selectionKey: ''
  });

  return React.createElement(
    SelectionContext.Provider,
    { value: { selection, setSelection } },
    children
  );
};

export const useSelectionContext = () => {
  const context = React.useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelectionContext must be used within a SelectionContextProvider');
  }
  return context;
};

export default SelectionContext;
export type { Selection, SelectionContextType };