<!--
 File Name: gsatabase.js

 Revision History:
        Gyeonglim Seo, 2019-03-26 : Created
-->
var db;

function gsCreateDatabase(){
    var shortName="FeedbackDB";
    var version="1.0";
    var displayName="DB for FeedbackDB app";
    var dbSize=2*1024*1024;

    function dbCreateSuccess() {
        console.info("Database created successfully");
    }
    db=openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
}
function gsCreateTables() {
    function txFunction(tx) {
        var sql="CREATE TABLE IF NOT EXISTS type{"+
            "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"+
            "name VARCHAR(20) not null);";
    }
}