import TableCell from "./TableCell";
import PersonEdit from "../PersonEdit";

const TableRow = ({person, onJournalUpdate}) => {
    const {
        id,
        name,
        patronymic,
        surname,
        lastSurname,
        birthday,
        deathday,
        genderId,
        fatherFullName,
        motherFullName,
        about
    } = person

    return (
        <div className="table__row">
            <TableCell item={name} />
            <TableCell item={patronymic} />
            <TableCell item={surname} />
            <TableCell item={lastSurname} />
            <TableCell item={birthday} />
            <TableCell item={deathday} />
            <TableCell item={genderId === 1 ? "муж" : "жен"} />
            <TableCell item={fatherFullName} />
            <TableCell item={motherFullName} />
            <TableCell item={about} />
            <PersonEdit personId={id} onJournalUpdate={onJournalUpdate}/>
        </div>
    )
};

export default TableRow;