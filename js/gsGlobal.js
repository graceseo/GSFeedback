/**
* File Name: gsGlobal.js

* Revision History:
*        Gyeonglim Seo, 2019-03-10 : Created
*/
function gsCheckRatingAdd_change() {
    gsShowHideRatingsAdd();
}

function gsFoodQualityAdd_change() {
    gsCalculateRatingAdd();
}

function gsServiceAdd_change() {
    gsCalculateRatingAdd();
}

function gsValueAdd_change() {
    gsCalculateRatingAdd();
}

function gsCheckRatingModify_change() {
    gsShowHideRatingsModify();
}

function gsFoodQualityModify_change() {
    gsCalculateRatingModify();
}

function gsServiceModify_change() {
    gsCalculateRatingModify();
}

function gsValueModify_change() {
    gsCalculateRatingModify()
}

function gsBtnSave_click() {
    gsAddFeedback();
}

function gsBtnUpdateModify_click() {
    gsUpdateFeedback();
}

function gsBtnSaveDefaults_click() {
    gsSaveDefaultsReviewerEmail();
}
function gsEditFeedbackPage_show() {
    $("#gsRatingsModify").hide();
    gsShowCurrentReview();
}

function gsBtnClearDatabase_click() {
    gsClearDatabase();
}

function gsAddFeedbackPage_show() {
    $("#gsRatingsAdd").hide();
    gsLoadDefaultEmail();
    gsUpdateTypesDropdown();
}

function gsVeiwFeedbackPage_show() {
    gsGetReviews();
}

function gsBtnDeleteModify_click() {
    gsDeleteFeddback();
}

function gsBtnCancelModify_click() {
    $(location).prop('href', '#gsVeiwFeedbackPage');
}

function init() {
    $("#gsCheckRatingAdd").on("click", gsCheckRatingAdd_change);
    $("#gsFoodQualityAdd").on("change", gsFoodQualityAdd_change);
    $("#gsServiceAdd").on("change", gsServiceAdd_change);
    $("#gsValueAdd").on("change", gsValueAdd_change);

    $("#gsCheckRatingModify").on("click", gsCheckRatingModify_change);
    $("#gsFoodQualityModify").on("change", gsFoodQualityModify_change);
    $("#gsServiceModify").on("change", gsServiceModify_change);
    $("#gsValueModify").on("change", gsValueModify_change);

    $("#gsBtnSave").on("click", gsBtnSave_click);

    $("#gsBtnDeleteModify").on("click", gsBtnDeleteModify_click);
    $("#gsBtnUpdateModify").on("click", gsBtnUpdateModify_click);
    $("#gsBtnCancelModify").on("click", gsBtnCancelModify_click);

    $("#gsBtnSaveDefaults").on("click", gsBtnSaveDefaults_click);
    $("#gsBtnClearDatabase").on("click", gsBtnClearDatabase_click);

    $("#gsAddFeedbackPage").on("pageshow", gsAddFeedbackPage_show);
    $("#gsEditFeedbackPage").on("pageshow", gsEditFeedbackPage_show);

    $("#gsVeiwFeedbackPage").on("pageshow", gsVeiwFeedbackPage_show);
}

function initDB() {
    try{
        gsCreateDatabase();
        if(db){
            console.info("Create table..");
            gsCreateTables();
        }
        else{
            console.error("Error: Cannot create tables: database does not exist")
        }
    }
    catch(e){
        console.error("Error: (Fatal) error in initDB(). Can not proceed.");
    }
}

$(document).ready(function () {
    init();
    initDB();
});