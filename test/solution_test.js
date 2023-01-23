const assert = require('assert');
const fs = require('fs');
let {removeDuplicates, cleanJSON, writeSolutionFile} = require('../solution.js');



describe('removeDuplicates()', () => {
    it('should remove duplicates from an array of objects', () => {
        const arr = [{name: 'John', age: 20, _id: 1}, {name: 'Jane', age: 25, _id: 2}, {name: 'John', age: 20, _id: 3}];
        const expected = [{name: 'John', age: 20}, {name: 'Jane', age: 25}];
        const result = removeDuplicates(arr);
        assert.deepEqual(result, expected);
    });

    it('should return the original array if it contains no duplicates', () => {
        const arr = [{name: 'John', age: 20, _id: 1}, {name: 'Jane', age: 25, _id: 2}, {name: 'Bob', age: 30, _id: 3}];
        const expected = [{name: 'John', age: 20, _id: 1}, {name: 'Jane', age: 25, _id: 2}, {name: 'Bob', age: 30, _id: 3}];
        const result = removeDuplicates(arr);
        assert.deepEqual(result, expected);
    });
});


describe('cleanJSON()', () => {
    beforeEach(() => {
        fs.writeFileSync('./clean_application.json', '');
    });
    
    it('should remove duplicates from fields and views of an JSONFile', () => {
        const JSONFile = {
            versions: [
                {
                    objects: [
                        {
                            fields: [
                                {name: 'field1', type: 'string'}, 
                                {name: 'field2', type: 'number'}, 
                                {name: 'field1', type: 'string'}
                            ]
                        }
                    ],
                    scenes: [
                        {
                            views: [
                                {name: 'view1'}, 
                                {name: 'view2'}, 
                                {name: 'view1'}
                            ]
                        }
                    ]
                }
            ]
        };
        const expected = {
            versions: [
                {
                    objects: [
                        {
                            fields: [
                                {name: 'field1', type: 'string'}, 
                                {name: 'field2', type: 'number'}
                            ]
                        }
                    ],
                    scenes: [
                        {
                            views: [
                                {name: 'view1'}, 
                                {name: 'view2'}
                            ]
                        }
                    ]
                }
            ]
        };
        const result = cleanJSON(JSONFile);
        assert.deepEqual(result, expected);
    });

});

