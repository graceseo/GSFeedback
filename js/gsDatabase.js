/**
* File Name: gsDatabase.js

* Revision History:
*        Gyeonglim Seo, 2019-03-26 : Created
*/
var db;

function errorHandler(tx, error) {
    console.error("SQL error: " + tx + " (" + error.code + ") : " + error.message);
}

/**
 * For creating database
 */
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

/**
 * When the mobile application start, this function creates tables
 */
function gsCreateTables() {
    function txFunction(tx) {
        var options=[];

        //drop 'type' table if it exists
        var dropTypeSql="DROP TABLE IF EXISTS type; ";
        var dropTypeMessage="'type' table dropped successfully";

        tx.executeSql(dropTypeSql, options, successExecute(dropTypeMessage), errorHandler);

        //create 'type' table
        var createTypeSql="CREATE TABLE IF NOT EXISTS type("+
            "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"+
            "name VARCHAR(20) not null);";
        var creatTypeMessage="'type' table created successfully";

        tx.executeSql(createTypeSql, options, successExecute(creatTypeMessage), errorHandler);

        //insert 3 records to 'type' table
        var insertSql=["INSERT INTO type (name) VALUES('Canadian')",
                        "INSERT INTO type (name) VALUES('Asian')",
                        "INSERT INTO type (name) VALUES('Others')"];

        for(var i=0; i<insertSql.length; i++){
            tx.executeSql(insertSql[i], options, successExecute("execute sql : " + insertSql[i]), errorHandler);
        }

        //create 'review' table
        var creatReviewSql="CREATE TABLE IF NOT EXISTS review( " +
            "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
            "businessName VARCHAR(30) NOT NULL," +
            "typeId INTEGER NOT NULL," +
            "reviewerEmail VARCHAR(30)," +
            "reviewerComments TEXT," +
            "reviewDate DATE," +
            "hasRating VARCHAR(1)," +
            "rating1 INTEGER," +
            "rating2 INTEGER," +
            "rating3 INTEGER," +
            "FOREIGN KEY(typeId) REFERENCES type(id));";
        var createReviewMessage="'review' table created successfully";

        tx.executeSql(creatReviewSql, options, successExecute(createReviewMessage), errorHandler);

        /**
         * this function shows all message on console
         * @param successMessage
         */
        function successExecute(successMessage) {
            console.info(successMessage);
        }
    }
    function successTransaction() {
        console.info("Create tables transaction successful");
    }
    db.transaction(txFunction, errorHandler, successTransaction );
}

function gsDropTables() {
    function txFunction(tx) {

        var options=[];

        var dropReviewSql="DROP TABLE review;";
        var dropReviewMessage="'review' table dropped successfully";

        tx.executeSql(dropReviewSql, options, successDropTables(dropReviewMessage), errorHandler);

        var dropTypeSql="DROP TABLE type;";
        var dropTypeMessage="'type' table dropped successfully";

        tx.executeSql(dropTypeSql, options, successDropTables(dropTypeMessage), errorHandler);

        function successDropTables(successMessage) {
            console.info(successMessage);
        }
    }
    function successTransaction() {
        console.info("Drop tables transaction successful");
    }
    db.transaction(txFunction, errorHandler, successTransaction );
}