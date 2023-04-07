import { useState, useEffect } from "react";
import Table from "./journal/Table";
import './styles/styles.scss';
import {CreatePerson} from "./CreatePerson";

export function JournalFilter() {

    const [persons, setPersons] = useState({ persons : []})

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

    useEffect(() => {
        callRequest();
    }, []);

    const callRequest = async () => {
        const response = await fetch("http://localhost:8989/web/person/get-journal", {
            method: "POST",
            headers: {
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Origin': 'http://localhost:8989',
                'Accept': 'application/json',
                'Content-Type' : 'application/json;charset=UTF-8',
                'X-User-Lang' : 'rus'
            },
            body: JSON.stringify({
                name: name,
                patronymic: patronymic,
                surname: surname,
                lastSurname: lastSurname,
                birthday: birthday,
                deathday: deathday,
                // genderId: genderId,
                // fatherId: fatherId,
                // motherId: motherId,
                limit : 10,
                offset : 0
            }),
        });
        const jsonResponse = await response.json();
        if (response.status === 200) {
            return jsonResponse;
        } else {
            setMessage(response.statusText);
            return jsonResponse;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setPersons([]);
            const response = await callRequest();
            setPersons(response.items);
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    return (
        <div>
            <div className='filter'>
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
                    <button type="submit">Поиск</button>
                    <div className="message">{message ? <p>{message}</p> : null}</div>
                </form>
            </div>

            <div className="createButton">
                <CreatePerson onJournalUpdate={handleSubmit}/>
            </div>
            <div className="journal">
                <Table persons={persons} onJournalUpdate={handleSubmit}/>
            </div>
        </div>
    );

}