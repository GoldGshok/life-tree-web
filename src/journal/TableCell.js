import {useState} from "react";

const TableCell = ({ item }) => {
    const [state] = useState(item);

    return (
        <div className="table__cell">
            <label>{state}</label>
        </div>
    )
}

export default TableCell;