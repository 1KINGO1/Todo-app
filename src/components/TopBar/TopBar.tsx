import React, {FC} from 'react';
import styles from './TopBar.module.scss';
import { AiOutlinePlus } from "react-icons/ai";
import TaskI from '../../shared/types/task';
import { v4 as uuidv4 } from 'uuid';
import LocalStorage from '../../service/LocalStorage';

const TopBar: FC<{setFetchedTasks: React.Dispatch<React.SetStateAction<TaskI[]>>}> = ({setFetchedTasks}) => {

  const addHandler = () => {

    const date = new Date().getTime();
    const id =  uuidv4();

    setFetchedTasks(prev => [{content: '', date, id}, ...prev]);
    LocalStorage.addRecord('', id, date);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.insideWrapper}>
        <h1 className={styles.title}>ToDo App</h1>
        <button className={styles.addButton} onClick={addHandler}><AiOutlinePlus/></button>
      </div>
    </div>
  )
}

export default TopBar;