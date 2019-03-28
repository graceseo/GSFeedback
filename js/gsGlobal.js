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
    gsAddReview();
}

function gsBtnUpdate_click() {
    gsModifyReview();
}

function gsBtnSaveDefaults_click() {
    gsSaveDefaultsReviewerEmail();
}

function gsFrmAddReview_show() {
    $("#gsRatingsAdd").hide();
}

function gsFrmModifyReview_show() {
    $("#gsRatingsModify").hide();
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

    $("#gsBtnUpdate").on("click", gsBtnUpdate_click);

    $("#gsBtnSaveDefaults").on("click", gsBtnSaveDefaults_click);
    $("#gsFrmAddReview").on("pageshow", gsFrmAddReview_show);
    $("#gsFrmModifyReview").on("pageshow", gsFrmModifyReview_show);
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

    }
}

$(document).ready(function () {
    init();
    initDB();
});