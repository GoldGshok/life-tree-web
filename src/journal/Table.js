import TableHeader from './TableHeader';
import TableRow from "./TableRow";

const Table = ({persons}) => {

    return (
        persons.length > 0
            ? <div className="table">
                <TableHeader/>
                {persons.map((person, id) => <TableRow key={id} person={person}/>)}
            </div>
            : <div></div>
    )
};

export default Table;