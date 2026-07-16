let numTest = [0,1,2,3,4,5,5,4,6]
let strTest = ["apple", "banana", "apple", "orange", "banana"]
let boolTest = [true, false, true, false, true]
let nullTest = [null, undefined, null, undefined, null]
let numStrTest = [1, "1", 2, "2", 1]
let boolStrTest = [true, "true", false, "false", true]
let mixTest = [1, "1", true, 1, true, null, null]
let user = { id:1 }
let repeatObjTest = [user, user]
let plainObj = [{id:1}, {id:1}]

const objA = { name: "Ali" };
const objB = { name: "Zain" };
const testRef2 = [objA, objB, objA];

const sharedObj = { role: "admin" };
const testRef3 = [1, sharedObj, "hello", sharedObj, 1];



function unique(values){
    
    const result = []
    
    for (const item of values){
        if(!result.includes(item)){
            result.push(item)
        }
    }
    
    return result
}

//console.log(`Unique Numbers: ${unique(numTest)}`)
//console.log(`Unique Strings: ${unique(strTest)}`)
//console.log(`Unique Booleans: ${unique(boolTest)}`)
//console.log("Unique Null/Undefined: ",unique(nullTest))
//console.log(`Unique NumStr: ${unique(numStrTest)}`)
//console.log(`Unique BoolStr: ${unique(boolStrTest)}`)
//console.log("Unique Mix: ",unique(mixTest))
//console.log("Unique Obj: ",unique(repeatObjTest))
//console.log("Unique Objects: ",unique(testRef2))
console.log("Unique Objects: ",unique(testRef3))
