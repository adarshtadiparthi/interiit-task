const godowns = require('./data/godowns.json');
const items = require('./data/items.json');
const Item = require('./models/items');
const {Godown,GodownItem,FinalGodown} = require('./models/godown');



const importData = async() => {
    try{
        const existingData = await Godown.find();
        if(existingData.length > 0){
            console.log('Data already exists!');
            return;
        }
        await Godown.insertMany(godowns);
        await Item.insertMany(items);
        console.log('Items inserted succesfully');
    }
    catch(err){ console.log(`An error ocurred : ${err}`) }
}

const importItemsData = async () => {
    try {
        const godownMap = {}; 
        items.forEach(item => {
            const godownId = item.godown_id;
            if (!godownMap[godownId]) {
                godownMap[godownId] = {
                    id: godownId,
                    name: '',
                    itemList: []
                };
            }
            godownMap[godownId].itemList.push({ item_id: item.item_id, name: item.name });
        });


        for (const godownId in godownMap) {
            const godownData = godownMap[godownId];
            const existingGodown = await Godown.findOne({ id: godownId });
            godownData.name = existingGodown.name;
            if (existingGodown) {
                const entry = new GodownItem({
                    id: godownData.id,
                    name: godownData.name,
                    itemList: godownData.itemList, 
                    parent_godown: existingGodown.parent_godown
                });
                // console.log(entry)
                entry.save();
            }
        }
        console.log("Item list created successfully.");
    } catch (err) {
        console.log(`An error occurred: ${err}`);
    }
};

const importGodowns = async () => {
    try {
        const parentGodownMap = [];
        const data = await GodownItem.find();
        data.forEach(subGodown => {
            const godownId = subGodown.parent_godown;
            if(!parentGodownMap[godownId]){
                parentGodownMap[godownId] = {
                    id : godownId,
                    name : '',
                    subGodownList : []
                };
            }
            parentGodownMap[godownId].subGodownList.push(subGodown);
        });

        for(const parentGodownId in parentGodownMap){
            const parentGodownData = parentGodownMap[parentGodownId];
            const existingGodown = await Godown.findOne({ id : parentGodownId });
            parentGodownData.name = existingGodown.name;
            console.log(parentGodownData);
            if(existingGodown){
                const entry = new FinalGodown({
                    id : parentGodownData.id,
                    name : parentGodownData.name,
                    subGodownList : parentGodownData.subGodownList
                });
                // console.log(entry);
                entry.save();
            }
        }
        console.log('Final data completed');
    }
    catch(err){
        console.log(`error is : ${err}`);
    }
}

module.exports = {importData,importItemsData,importGodowns};

