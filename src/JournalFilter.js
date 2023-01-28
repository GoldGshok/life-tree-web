import { useState } from "react";
import Table from "./journal/Table";

export function JournalFilter() {

    const [data, setData] = useState({person : []})

    const [name, setName] = useState(null);
    const [patronymic, setPatronymic] = useState(null);
    const [surname, setSurname] = useState(null);
    const [lastSurname, setLastSurname] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [deathday, setDeathday] = useState(null);
    // const [genderId, setGenderId] = useState("");
    // const [fatherId, setFatherId] = useState("");
    // const [motherId, setMotherId] = useState("");

    const [message, setMessage] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:8989/web/person/get-journal", {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    patronymic: patronymic,
                    surname: surname,
                    lastSurname: lastSurname,
                    birthday: birthday,
                    deathday: deathday
                    // genderId: genderId,
                    // fatherId: fatherId,
                    // motherId: motherId,
                }),
            });
            await res.json();
            if (res.status === 200) {
                setData(res.get('items'))
            } else {
                setMessage(res.statusText);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    placeholder="Имя"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    value={patronymic}
                    placeholder="Отчество"
                    onChange={(e) => setPatronymic(e.target.value)}
                />
                <input
                    type="text"
                    value={surname}
                    placeholder="Фамилия"
                    onChange={(e) => setSurname(e.target.value)}
                />
                <input
                    type="text"
                    value={lastSurname}
                    placeholder="Предыдущая фамилия"
                    onChange={(e) => setLastSurname(e.target.value)}
                />
                <input
                    type="date"
                    value={birthday}
                    placeholder="Дата рождения"
                    onChange={(e) => setBirthday(e.target.value)}
                />
                <input
                    type="date"
                    value={deathday}
                    placeholder="Дата смерти"
                    onChange={(e) => setDeathday(e.target.value)}
                />

                <button type="submit">Create</button>
                <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
            <Table persons={data}/>
        </div>
    );

}