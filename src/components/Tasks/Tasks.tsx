import React, {FC, useState} from 'react';
import styles from './Tasks.module.scss';
import Task from './Task';
import TaskI from '../../shared/types/task';

const Tasks: FC<{fetchedTasks: TaskI[], setFetchedTasks: React.Dispatch<React.SetStateAction<TaskI[]>>}> = ({fetchedTasks, setFetchedTasks}) => {

  return (
    <div className={styles.wrapper}>
        {fetchedTasks.length ? fetchedTasks.map(task => (
          <Task content={task.content} id={task.id} key={task.id} deleted={false} date={task.date} setFetchedTasks={setFetchedTasks}/>
        )) : <p>Nothing here yet</p>}
    </div>
  )
};

export default Tasks