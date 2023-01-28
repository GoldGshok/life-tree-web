import TableCell from "./TableCell";

const TableRow = ({person}) => {
    const {
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
            <TableCell item={genderId} />
            <TableCell item={fatherId} />
            <TableCell item={motherId} />
            <TableCell item={about} />
        </div>
    )
};

export default TableRow;