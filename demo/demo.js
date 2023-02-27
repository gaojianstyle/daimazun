
class demo {
    constructor(params) {
        this.params = params;
    }
    echo() {
        console.log("daimazun包导入成功!!!!!", this.params)
        return "导入成功";
    }
}
module.exports = {
    demo
}