import TaskI from '../shared/types/task';

export default {
  fetchAllRecords(){
    const result = JSON.parse(localStorage.getItem('tasks') as string) as TaskI[];
    if (!result){
      localStorage.setItem('tasks', '[]');
    }
    return result || [];
  },
  addRecord(content: string, id: string, date: number){
    const records = this.fetchAllRecords();
    localStorage.setItem('tasks', JSON.stringify([{content, id, date}, ...records]));
  },
  editRecord(id: string, newContent: string){
    const records = this.fetchAllRecords();
    const newRecords = [];
    for (let record of records){
      if (record.id === id){
        record.content = newContent;
      }
      newRecords.push(record);
    }
    localStorage.setItem('tasks', JSON.stringify(newRecords));
  },
  deleteRecord(id: string){
    const records = this.fetchAllRecords();
    const newRecords = [];
    for (let record of records){
      if (record.id === id){
        continue;
      }
      newRecords.push(record);
    }
    localStorage.setItem('tasks', JSON.stringify(newRecords));
  }
}