import {FC, useState, MouseEvent} from 'react';
import styles from './Checkbox.module.scss';
import { AiOutlineCheck } from "react-icons/ai";

interface CheckboxProps{
  value: boolean
}

const Checkbox: FC<CheckboxProps> = ({value}) => {

  return (
    <div className={value ? styles.wrapperActive : styles.wrapper}>
      {value && <AiOutlineCheck/>}
    </div>
  )
};

export default Checkbox;