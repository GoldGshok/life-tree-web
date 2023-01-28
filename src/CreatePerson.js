import { useState } from "react";

export function CreatePerson() {

    const [name, setName] = useState(null);
    const [patronymic, setPatronymic] = useState(null);
    const [surname, setSurname] = useState(null);
    const [lastSurname, setLastSurname] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [deathday, setDeathday] = useState(null);
    const [genderId, setGenderId] = useState(null);
    const [fatherId, setFatherId] = useState(null);
    const [motherId, setMotherId] = useState(null);
    const [about, setAbout] = useState(null);
    const [message, setMessage] = useState(null);


    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:8989/web/person/create", {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    patronymic: patronymic,
                    surname: surname,
                    lastSurname: lastSurname,
                    birthday: birthday,
                    deathday: deathday,
                    genderId: genderId,
                    fatherId: fatherId,
                    motherId: motherId,
                    about: about
                }),
            });
            await res.json();
            if (res.status === 200) {
                setName(null);
                setPatronymic(null);
                setSurname(null);
                setLastSurname(null);
                setBirthday(null);
                setDeathday(null);
                setGenderId(null);
                setFatherId(null);
                setMotherId(null);
                setAbout(null);
                setMessage("Информация о человеке успешно добавлена");
            } else {
                setMessage(res.json());
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
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
            <input
                type="text"
                value={genderId}
                placeholder="Пол"
                onChange={(e) => setGenderId(e.target.value)}
            />
            <input
                type="text"
                value={fatherId}
                placeholder="Папа"
                onChange={(e) => setFatherId(e.target.value)}
            />
            <input
                type="text"
                value={motherId}
                placeholder="Мама"
                onChange={(e) => setMotherId(e.target.value)}
            />
            <input
                type="text"
                value={about}
                placeholder="О человеке"
                onChange={(e) => setAbout(e.target.value)}
            />

            <button type="submit">Create</button>
            <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
    );

}