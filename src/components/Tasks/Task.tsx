import React, {ChangeEvent, FC, MouseEvent, useEffect, useRef, useState} from 'react';
import styles from './Task.module.scss';
import Checkbox from '../Checkbox/Checkbox';
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import localStorage from '../../service/LocalStorage';
import TaskI from '../../shared/types/task';

interface TaskProps{
  id: string,
  deleted: boolean,
  content: string,
  date: number
}

const Task: FC<TaskProps & {setFetchedTasks: React.Dispatch<React.SetStateAction<TaskI[]>>}> = ({content: initialContent, id, date, setFetchedTasks}) => {

  const [deleted, setDeleted] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [isEditModeOpened, setEditModeVisible] = useState(false);
  const [editInputValue, setInputValue] = useState(initialContent);

  const inputRef = useRef<any>(null);

  const clickHandler = () => {
    if (isEditModeOpened){
      setContent(editInputValue);
      setEditModeVisible(false);
    }
    if (deleted){
      setDeleted(false);
      localStorage.addRecord(content, id, date);
    }
    else{
      setDeleted(true);
      localStorage.deleteRecord(id);
    }
  }
  const editHandler = (e: {stopPropagation: Function}) => {
    e.stopPropagation();
    if (deleted) return;
    if (isEditModeOpened) {
      setContent(editInputValue);
      setEditModeVisible(false);
      localStorage.editRecord(id, editInputValue);
      return;
    }
    setEditModeVisible(true);
  }
  const editInputHandler = (e: MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  }
  const editInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  const deleteHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (deleted) return;
    localStorage.deleteRecord(id);

    setFetchedTasks(tasks => {
      return tasks.filter(task => task.id !== id);
    })
  }

  useEffect(() => {
    if (isEditModeOpened) inputRef.current?.focus();
  }, [isEditModeOpened])

  return(
    <div className={deleted ? styles.deletedWrapper : styles.wrapper} onClick={clickHandler}>
      <Checkbox value={deleted}/>

      <>
        {!isEditModeOpened ?
          <p className={deleted ? styles.contentCompleted : styles.content}>{content}</p> :
          <input type="text"
                 className={styles.contentEdit}
                 onClick={editInputHandler}
                 onBlur={editHandler}
                 defaultValue={content}
                 onChange={editInputChangeHandler}
                 ref={inputRef}
          />
        }
      </>

      <div className={styles.toolsWrapper}>
        <div className={deleted ? styles.toolHidden : styles.tool} onClick={editHandler}>
          <AiOutlineEdit />
        </div>
        <div className={deleted ? styles.toolHidden : styles.tool} onClick={deleteHandler}>
          <AiOutlineDelete />
        </div>
      </div>
    </div>
  )
}

export default Task;