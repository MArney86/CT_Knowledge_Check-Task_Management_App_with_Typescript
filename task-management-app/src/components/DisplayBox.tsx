import { useSelectionContext } from "../contexts/SelectionContext";
import { useUserContext } from "../contexts/UserContext";

export default function DisplayBox() {
    const user = useUserContext();
    const selection = useSelectionContext();

    return (
        <div className="display-box">
            <p>Please select a task to view details.</p>
        </div>
    );
}