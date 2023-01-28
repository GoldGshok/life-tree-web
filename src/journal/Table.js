import TableHeader from './TableHeader';
import TableRow from "./TableRow";

const Table = ({persons}) => {
    return (
        persons
            ? <div className="table">
                <TableHeader/>
                {persons.map((person, id) => <TableRow key={id} person={person} />)}
            </div>
            : <div>loading...</div>
    )
};

export default Table;