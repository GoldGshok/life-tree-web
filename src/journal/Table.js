import TableHeader from './TableHeader';
import TableRow from "./TableRow";

const Table = ({persons, onJournalUpdate}) => {

    return (
        persons.length > 0
            ? <div className="table">
                <TableHeader/>
                {persons.map((person, id) => <TableRow key={id} person={person} onJournalUpdate={onJournalUpdate}/>)}
            </div>
            : <div></div>
    )
};

export default Table;