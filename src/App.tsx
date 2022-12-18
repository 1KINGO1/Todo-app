import React, {useState} from 'react';
import styles from './App.module.scss';
import TopBar from './components/TopBar/TopBar';
import Tasks from './components/Tasks/Tasks';
import TaskI from './shared/types/task';
import LocalStorage from './service/LocalStorage';
import CountTable from './components/CountTable/CountTable';

function App() {

  const [fetchedTasks, setFetchedTasks] = useState<TaskI[]>(LocalStorage.fetchAllRecords());

  return (
    <main className={styles.container}>
      <TopBar setFetchedTasks={setFetchedTasks}/>
      <Tasks fetchedTasks={fetchedTasks} setFetchedTasks={setFetchedTasks}/>
      <CountTable tasks={fetchedTasks}/>
    </main>
  );
}

export default App;
