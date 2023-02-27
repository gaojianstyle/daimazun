


// function f(){
//
// }
//
// f.prototype.uuid = function() {
//     console.log('uuid hcdhjkfh ')
// }

class f{
    constructor() {

    }
    uuid(){
        const uuid = require('uuid');
        return uuid.v1().replace(new RegExp('-', "gm"), '');
    }
}


module.exports = {
    f
};


















