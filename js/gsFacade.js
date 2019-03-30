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

/**
 * If Add review page call this function, default type will be 'others'
 * however, modify review page call this function, the chosen type will show
 */

function gsUpdateTypesDropdown(para) {
    var options = [];
    var parameter=para;

    function callback(tx, results) {
        var htmlCode="";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var selected="";
            if(parameter!=null){
                if(row['id']===para){
                    selected="selected";
                }
            }else{
                if(row['name']==="Others"){
                    selected="selected";
                }
            }
            htmlCode +="<option value="+row['id']+" "+selected+">"+row['name']+"</option>";
        }

        if(parameter!=null){
            var sv=$("#gsTypeModify");
        }else{
            var sv = $("#gsTypeAdd");
        }
        sv =sv.html(htmlCode);
        sv.selectmenu("refresh");
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
        if(hasRating){
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

function gsGetReviews() {
    var options=[];

    function callback(tx, results) {
        var htmlCode="";

        for(var i=0; i<results.rows.length; i++){
            var row=results.rows[i];
            var overollRating=0;

            //Only if the 'hasRating' field is true, ovarollaRating will be calculated
            if(row['hasRating']){
                //call a function for calculating
                overollRating=getOverallRating(row['rating1'],row['rating2'],row['rating3']);
            }
            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>"+
                "<h2>Business Name: "+row['businessName']+"</h2>"+
                "<p>Reviewer Email: "+row['reviewerEmail']+"<br>"+
                "Comments: "+row['reviewerComments']+"<br>"+
                "Overall Rating: "+overollRating+"</p></a></li>";
        }

        var lv = $("#gsFeedbackList");

        lv =lv.html(htmlCode);
        lv.listview("refresh");  //very important

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id") );

            $(location).prop('href', '#gsEditFeedbackPage');
        }

        $("#gsFeedbackList a").on("click", clickHandler);

    }

    Review.selectAll(options, callback);
}

function gsShowCurrentReview() {
    var id=localStorage.getItem("id");
    var options=[id];

    function callback(tx, results) {
        var row=results.rows[0];
        var overollRating=0;

        $("#gsBusinessNameModify").val(row['businessName']);
        //$("#gsTypeAdd").val(row['typeId']);
        $("#gsReviewerEmailModify").val(row['reviewerEmail']);
        $("#gsReviewerCommentModify").val(row['reviewerComments']);
        $("#gsReviewDateModify").val(row['reviewDate']);

        if (row['hasRating'] === 'true') {
            overollRating=getOverallRating(row['rating1'],row['rating2'],row['rating3']);

            $("#gsCheckRatingModify").prop("checked",true);

            $("#gsRatingsModify").show();

            $("#gsFoodQualityModify").val(row['rating1']);
            $("#gsServiceModify").val(row['rating2']);
            $("#gsValueModify").val(row['rating3']);
            $("#gsOverallRatingsModify").val(overollRating);
        }
        else{
            $("#gsRatingsModify").hide();
            $("#gsCheckRatingModify").prop("checked",false);
        }
        gsUpdateTypesDropdown(row['typeId']);
        $("#gsFrmModifyReview :checkbox").checkboxradio("refresh");
    }
    Review.select(options,callback);
}

function gsUpdateFeedback(){
    var id=localStorage.getItem("id");
    if(gsDoValidate_gsFrmModifyReview()){
        console.info("Update Validation is successful");
        //2. if validation is successful then fetch the info from input controls
        var businessName = $("#gsBusinessNameModify").val();
        var typeId=$("#gsTypeModify").val();
        var reviewerEmail=$("#gsReviewerEmailModify").val();
        var reviewerComments=$("#gsReviewerCommentModify").val();
        var reviewDate=$("#gsReviewDateModify").val();
        var hasRating=$("#gsCheckRatingModify").prop("checked");
        var rating1=$("#gsFoodQualityModify").val();
        var rating2=$("#gsServiceModify").val();
        var rating3=$("#gsValueModify").val();
        var opt;

        //3. only your ratings' checkbox is checked, rating1/rating2/rating3 is included
        if(hasRating){
            opt = [businessName, typeId, reviewerEmail,reviewerComments,reviewDate,hasRating,rating1,rating2,rating3,id];
        }else{
            opt=[businessName, typeId, reviewerEmail, reviewerComments,reviewDate,hasRating,null,null,null,id];
        }
        function success() {
             alert("Feedback updated successfully");

            $(location).prop('href', '#gsVeiwFeedbackPage');
        }
        //4. insert into table (by calling insert DAL function and supplying the inputs
        Review.update(opt, success);

    }else{
        console.error("Update review failed");
    }
}

function gsDeleteFeddback() {
    var id=localStorage.getItem("id");
    var opt=[id];

    function success() {
        alert("Feedback Deleted successfully");
        $(location).prop('href', '#gsVeiwFeedbackPage');
    }
    Review.delete(opt, success);
}