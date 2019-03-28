/**
* File Name: gsatabase.js

* Revision History:
*        Gyeonglim Seo, 2019-03-26 : Created
*/
var db;

function errorHandler(tx, error) {
    console.error("SQL error: " + tx + " (" + error.code + ") : " + error.message);
}
function gsCreateDatabase(){
    var shortName="FeedbackDB";
    var version="1.0";
    var displayName="DB for FeedbackDB app";
    var dbSize=2*1024*1024;

    console.info("Creating database...");

    function dbCreateSuccess() {
        console.info("Database created successfully");
    }
    db=openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
}

function gsCreateTables() {
    function txFunction(tx) {
        var options=[];

        var dropTypeSql="DROP TABLE IF EXISTS type; ";

        function successDrop() {
            console.info("Type table dropped successfully");
        }
        tx.executeSql(dropTypeSql, options, successDrop, errorHandler);

        var createTypeSql="CREATE TABLE IF NOT EXISTS type("+
            "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"+
            "name VARCHAR(20) not null);";

        function successCreate() {
            console.info("Type table created successfully");
        }
        tx.executeSql(createTypeSql, options, successCreate, errorHandler);

        var insertSql=["INSERT INTO type (name) values('Canadian')",
                        "INSERT INTO type (name) values('Asian')",
                        "INSERT INTO type (name) values('Others')"];

        function successInsert() {
            console.info("Record inserted successfully");
        }

        for(var i=0; i<insertSql.length; i++){
            console.log("execute sql : " + insertSql[i]);
            tx.executeSql(insertSql[i], options, successInsert, errorHandler);
        }
    }

    function successTransaction() {
        console.info("Create table transaction successful");
    }
    db.transaction(txFunction, errorHandler, successTransaction );
}