const basicApiHandler = {
    create(curList, newRecord){
        newRecord.id = new Date().getTime();
        curList.push(newRecord);
        return curList;
    },
    read(){
        return [{ id: 1, value: 'brian' }, { id: 2, value: 'pete' }];
    },
    update(curList, updatedRecord){
        const updatedList = curList.map(row => {
            if(row.id===updatedRecord.id){ return updatedRecord; }
            return row;
        });
        return updatedList;
    },
    delete(curList, deleteRecord){
        const updatedList = curList.filter(row => row.id !== deleteRecord.id);
        return updatedList;
    }
}

export {
    basicApiHandler
}