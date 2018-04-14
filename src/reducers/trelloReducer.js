const trelloReducer = (state = {}, action) => {
    switch (action.type) {
      case 'TASK_DETAILS':
            let trelloContent = {};
            action.payload.forEach(element => {
                trelloContent = Object.assign({}, trelloContent, state, { [element.type]: element.list } )
            });

            return trelloContent;
      case 'ADD_TASK':
        return Object.assign({}, state, { [action.item.addType]: [...state[action.item.addType], action.item.item] },
            { [action.item.removeType]: action.item.removeType && state[action.item.removeType].filter((eachItem) => eachItem.title !== action.item.item.title) });
      case 'REMOVE_TASK':
            const { type, title } = action.item;

            const newList = state[type].filter((eachList) => eachList.title !== title);
        return Object.assign({}, state, {[type]: newList});
      case 'EDIT_TASK':
            const typeVal = action.item.item.type;
            const oldTitle  = action.item.item.oldTitle;
            
            let editList = [];
            state[typeVal].forEach((data, idx) => {
                if(data.title == oldTitle){
                  data.title = action.item.item.title;
                  data.description = action.item.item.description;
                }
                editList[idx] = data;
              });
         
            return Object.assign({}, state, {[typeVal]: editList});
      default:
        return state
    }
}
  
export default trelloReducer;