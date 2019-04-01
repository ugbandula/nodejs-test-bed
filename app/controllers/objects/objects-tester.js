let _ = require('underscore');

let sourceObj = {
    field1: 'value1',
    field2: ['value21', 'value22'],
    field3: {
        field31: 'value31',
        field32: 'value32'
    }
};

let object2 = {
    field1: 'obj2Value1',
    field2: ['obj2Value21'],
    field3: {
        field31: 'obj2Value31',
        field32: 'obj2Value32'
    }
};

let object3 = {
    field1: 'obj3Value1',
    field2: ['obj3Value21'],
    field3: {
        field31: 'obj3Value31',
        field32: null
    }
};

///////////////////////////////////////////////////////////////
// 	Exposed Methods
///////////////////////////////////////////////////////////////
module.exports = {
    objectMergerTestUsingAssign: function(req, res) {
        console.log('Object merging using Object.assign:');
        console.log('-----------------------------------');
        console.log('Object 1:');
        console.log(sourceObj);
        console.log('');
        console.log('Object 2:');
        console.log(object2);
        console.log('');
        console.log('Object 3:');
        console.log(object3);
        console.log('');

        console.log('Result: Merge Object1 with Object2');
        Object.assign(sourceObj, object2);
        console.log(sourceObj);
        console.log('');

        console.log('Result: Merge Result1 with Object3');
        Object.assign(sourceObj, object3);
        console.log(sourceObj);
        console.log('');
        console.log('SUMMARY: Object.assign will replace the source object will properties from the latter');
        console.log('');

        res.json({ success: 'true'});
    },

    objectMergerTestUsingHasOwnProperty: function(req, res) {
        console.log('Object merging using extend:');
        console.log('-----------------------------------');
        let result4 = extend(sourceObj, object3);
        console.log('Result: Merge Object1 with Object2 using hasOwnProperty() method');
        console.log(result4);

        res.json({ success: 'true'});
    },

    objectMergerTestUsingUnderscoreMerge: function(req, res) {
        console.log('Object merging using underscore:');
        console.log('--------------------------------');
        let result5 = {};
            _.extend(result5, sourceObj, object3);
        console.log('Result: Merge Object1 with Object2 using underscore _.merge method');
        console.log(result5);

        res.json({ success: 'true'});
    },

    objectMergerTestUsingCustomMerge: function(req, res) {
        console.log('Object merging using custom merger:');
        console.log('--------------------------------');
        let result6 = customMerger(sourceObj, object3);
        console.log('Result: Merge Object1 with Object2 using custom merger method');
        console.log(result6);

        res.json({ success: 'true'});
    }
};

function extend(obj, src) {
    // ES-5/6
    Object.keys(src).forEach(function(key) {
        if (src[key] != null)
            obj[key] = src[key];
    });

    // ES-8
    // for (var key in src) {
        // if ((src.hasOwnProperty(key)) && (src[key] != null))
        //     obj[key] = src[key];
    // }
    return obj;
}

function customMerger(src, obj) {
    let result = {};
    if (obj.field1) result.field1 = obj.field1;
    if (obj.field2) {
        result.field2 = _.union(src.field2, obj.field2);
    }

    return result;
}
