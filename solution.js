const rawSchema = require("./mock_application.json");
const fs = require('fs')

function removeDuplicates(arr){
    let arrCopy = structuredClone(arr)
    let cleanArrString = [];
    let cleanArr = [];
    let uniqueIndexes = [];

    arrCopy.forEach(element => {
        //remove id to find duplicates
        element._id = ''
        
        /// stringify to allow comparison of objects 
        const elementStrig = JSON.stringify(element);

        if (!cleanArrString.includes(elementStrig)) {
            //find the index of unique objects 
            uniqueIndexes.push(arrCopy.indexOf(element));
            // push in the array used for comparison the strings if unique
            cleanArrString.push(elementStrig);
        }
    })
    uniqueIndexes.forEach(index => {
        // push in the cleanArray only the unique objects of the original array through their index
        cleanArr.push(arr[index])
    })
    return cleanArr
}


function cleanJSON(JSONFile) {
    // start from a clean json
    fs.writeFile('./clean_application.json', '', err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })

    let cleanSchema = structuredClone(JSONFile)

    // more conditions could be added here
    if (cleanSchema.versions[0].objects && typeof cleanSchema.versions[0].objects == 'object') {
        
        // Replace fields with only unique fields
        let objects = cleanSchema.versions[0].objects
        objects.map(element => {
            element.fields = removeDuplicates(element.fields)
        })

        // print to check if any has been deleted (optional but can be useful)
        // this could be a function for drier code
        for (let i = 0; i < rawSchema.versions[0].objects.length; i += 1 ) {
            console.log( ' RAW > object', i, 'has', rawSchema.versions[0].objects[i].fields.length, 'fields')
        }
        for (let i = 0; i < cleanSchema.versions[0].objects.length; i += 1 ) {
            console.log( ' CLEAN > object', i, 'has', cleanSchema.versions[0].objects[i].fields.length, 'fields')
        }
    } else {
        console.log('Please input a valid JSON')
    }

    // more conditions could be added here
    if (cleanSchema.versions[0].scenes && typeof cleanSchema.versions[0].scenes == 'object') {
        
        // Replace views with only unique views
        let scenes = cleanSchema.versions[0].scenes
        scenes.map(element => {
            element.views = removeDuplicates(element.views)
        })

        // print to check if any has been deleted
        // this could be a function for drier code
        for (let i = 0; i < rawSchema.versions[0].scenes.length; i += 1 ) {
            console.log( ' RAW > scenes', i, 'has', rawSchema.versions[0].scenes[i].views.length, 'views')
        }
        for (let i = 0; i < cleanSchema.versions[0].scenes.length; i += 1 ) {
            console.log( ' CLEAN > scenes', i, 'has', cleanSchema.versions[0].scenes[i].views.length, 'views')
        }    
    }
    return cleanSchema
}

// Create overall JSON file with unique fields
function writeSolutionFile(content) {
    fs.writeFile('./clean_application.json', JSON.stringify(content, null, 4), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}

let solutionContent = cleanJSON(rawSchema)
writeSolutionFile(solutionContent)


module.exports = {removeDuplicates, cleanJSON, writeSolutionFile};

