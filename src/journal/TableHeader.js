const TableHeader = () => {
    return (
        <div className="table__row table__row--header">
            <div className="table__cell">Имя</div>
            <div className="table__cell">Отчество</div>
            <div className="table__cell">Фамилия</div>
            <div className="table__cell">Прошлая фамилия</div>
            <div className="table__cell">Дата рождения</div>
            <div className="table__cell">Дата смерти</div>
            <div className="table__cell">Пол</div>
            <div className="table__cell">Папа</div>
            <div className="table__cell">Мама</div>
            <div className="table__cell">О человеке</div>
        </div>
    )
};

export default TableHeader;