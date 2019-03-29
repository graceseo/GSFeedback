/**
 * File Name: gsFacade.js

 * Revision History:
 *        Gyeonglim Seo, 2019-03-10 : Created
 */

/**
 * Control showing of gsRatings as Div for Add a Feedback page
 */
function gsShowHideRatingsAdd() {
    if($("#gsCheckRatingAdd").prop("checked")){
        $("#gsRatingsAdd").show();
    }else{
        $("#gsRatingsAdd").hide();
    }
}

/**
 * Control showing of gsRatings as Div for Modify Feedback page
 */
function gsShowHideRatingsModify() {
    if($("#gsCheckRatingModify").prop("checked")){
        $("#gsRatingsModify").show();
    }else{
        $("#gsRatingsModify").hide();
    }
}
/**
 * Input a overall rating received from a function for Add a feedback page
 */
function gsCalculateRatingAdd() {
    var quality =Number($("#gsFoodQualityAdd").val());
    var value=Number($("#gsValueAdd").val());
    var service=Number($("#gsServiceAdd").val());

    var overallRating=getOverallRating(quality,value,service);

    $("#gsOverallRatingsAdd").val(overallRating+"%");
}
/**
 * Input a overall rating received from a function for modify feedb ack page
 */
function gsCalculateRatingModify() {
    var quality =Number($("#gsFoodQualityModify").val());
    var value=Number($("#gsValueModify").val());
    var service=Number($("#gsServiceModify").val());

    var overallRating=getOverallRating(quality,value,service);

    $("#gsOverallRatingsModify").val(overallRating+"%");
}

function gsModifyReview() {
    if(gsDoValidate_gsFrmModifyReview()){
        console.info("Review Modified successfully");
    }else{
        console.error("Modify Review failed");
    }
}

function gsSaveDefaultsReviewerEmail(){
    gsAddToStorage();
}

function gsClearDatabase() {
    var result=confirm("Really want to clear database?");
    if(result){
        try{
            gsDropTables();
            alert("Database Cleared!");
        }catch(e){
            alert(e);
        }
    }
}

function gsLoadDefaultEmail() {
    var defaultEmail=localStorage.getItem("DefaultEmail");
    $("#gsReviewerEmailAdd").val(defaultEmail);
}

function gsUpdateTypesDropdown() {
    var options = [];

    function callback(tx, results) {
        var typeAppend = $("#gsTypeAdd");
        typeAppend.empty();


        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var selected="";
            if(row['name']==="Others"){
                selected="selected";
            }
            var htmlCode ="<option value="+row['id']+" "+selected+">"+row['name']+"</option>";
            typeAppend.append(htmlCode);
        }
    }
    Type.selectAll(options, callback);
}

function gsAddFeedback() {
    //1.test validation
    if(gsDoValidate_gsFrmAddReview()){
        console.info("Validation is successful");
        //2. if validation is successful then fetch the info from input controls
        var businessName = $("#gsBusinessNameAdd").val();
        var typeId=$("#gsTypeAdd").val();
        var reviewerEmail=$("#gsReviewerEmailAdd").val();
        var reviewerComments=$("#gsReviewerCommentAdd").val();
        var reviewDate=$("#gsReviewDateAdd").val();
        var hasRating=$("#gsCheckRatingAdd").prop("checked");
        var rating1=$("#gsFoodQualityAdd").val();
        var rating2=$("#gsServiceAdd").val();
        var rating3=$("#gsValueAdd").val();
        var opt;

        //3. only your ratings' checkbox is checked, rating1/rating2/rating3 is included
        if(hasRating===1){
            opt = [businessName, typeId, reviewerEmail,reviewerComments,reviewDate,hasRating,rating1,rating2,rating3];
        }else{
            opt=[businessName, typeId, reviewerEmail, reviewerComments,reviewDate,hasRating,null,null,null];
        }
        function success() {
            console.info("Record inserted successfully");
            alert("New Feedback Added");
        }
        //4. insert into table (by calling insert DAL function and supplying the inputs
        Review.insert(opt, success);

    }else{
        console.error("Adding Review failed");
    }
}