import {FC} from 'react';
import styles from './CountTable.module.scss';
import TaskI from '../../shared/types/task';



const CountTable: FC<{tasks: TaskI[]}> = ({tasks}) => {

  return (
    <div className={styles.wrapper}>
      <p className={styles.taskCount}>{tasks.length}</p>
      <p className={styles.usedMemory}>{JSON.stringify(tasks).length} bytes</p>
    </div>
  )
}

export default CountTable;