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

function gsAddReview() {

    if(gsDoValidate_gsFrmAddReview()){
        console.info("Review Added successfully");
    }else{
        console.error("Adding Review failed");
    }
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