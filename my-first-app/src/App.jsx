import './App.css';
import MyButton from './components/MyButton';
import FunctionalArrow from './components/FunctionalArrow';
import ClassComponent from './components/ClassComponent';
import Card from './components/Card';
import CardList from './components/CardList';
import ReactPlayer from 'react-player';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FunctionalArrow />
        <ClassComponent isImportant />
        <ReactPlayer url="https://www.youtube.com/watch?v=wl4m1Rqmq-Y" />
        <CardList>
          <Card
            firstName="Lucia"
            lastName="Duarte"
            week={5}
            course={{ city: 'Lisbon', name: 'Web Dev' }}
          />
          <Card
            firstName="Miguel"
            lastName="Gomes"
            week={8}
            course={{ city: 'Barcelona', name: 'Data' }}
          />
          <Card
            firstName="Xico"
            lastName="Duarte"
            week={2}
            course={{ city: 'Madrid', name: 'UX/UI' }}
          />
        </CardList>
        <MyButton />
      </header>
    </div>
  );
}

export default App;
