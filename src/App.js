import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CreatePerson } from './CreatePerson';
import { JournalFilter } from './JournalFilter';

function App() {
  return (
    <div className="main">
        <CreatePerson/>
        <JournalFilter/>
    </div>

  );
}

export default App;
