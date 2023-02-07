import TableCell from "./TableCell";
import PersonEdit from "../PersonEdit";

const TableRow = ({person}) => {
    const {
        id,
        name,
        patronymic,
        surname,
        lastSurname,
        birthday,
        deathday,
        genderId,
        fatherId,
        motherId,
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
            <TableCell item={fatherId} />
            <TableCell item={motherId} />
            <TableCell item={about} />
            <PersonEdit personId={id}/>
        </div>
    )
};

export default TableRow;