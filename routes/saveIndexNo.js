var indexNo;

function saveIndexNo(IndexNo) {
    console.log("i got it")
    indexNo = IndexNo;
}

function giveIndexNo(){
    return indexNo;
}

module.exports =  {giveIndexNo}