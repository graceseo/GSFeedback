/**
 * File Name: gsUtil.js
 *
 * Revision History:
 *        Gyeonglim Seo, 2019-03-10 : Created
 */

/**
 * Return the overall rating calculated
 */
function getOverallRating(quality,service,value) {

    var overallRating=Math.round((quality+service+value)*100/15);

    return overallRating;
}

/**
 * Save the default reviewer email to local storage
 */
function gsAddToStorage(){
    if (localStorage.getItem("DefaultEmail"))
    {
        localStorage.removeItem("DefaultEmail");
    }
    localStorage.setItem("DefaultEmail", $("#gsDefaultReviewerEmail").val());
    alert("Default reviewer email saved");
}

/**
 * Check validation for Adding a review
 * @returns {*|jQuery|boolean}
 */
function gsDoValidate_gsFrmAddReview() {
    var form=$("#gsFrmAddReview");
    form.validate({
        rules:{
            gsBusinessNameAdd:{
                required: true,
                minlength:2,
                maxlength: 20
            },
            gsReviewerEmailAdd:{
                required: true,
                conestogaEmailcheck:true,
                emailCheck:true
            },
            gsReviewDateAdd:{
                required:true
            },
            gsFoodQualityAdd:{
                min:0,
                max:5
            },
            gsServiceAdd:{
                min:0,
                max:5
            },
            gsValueAdd:{
                min:0,
                max:5
            }
        },
        messages:{
            gsBusinessNameAdd:{
                required: "Business Name is required",
                minlength:"Length must be 2-20 characters long",
                maxlength:"Length must be 2-20 characters long"
            },
            gsReviewerEmailAdd:{
                required: "Email is required",
                conestogaEmailcheck:"Email must be a conestoga email",
                emailCheck: "Email is not valid"
            },
            gsReviewDateAdd:{
                required:"Review data is required"
            },
            gsFoodQualityAdd:{
                min:"Value must be 0-5",
                max:"Value must be 0-5"
            },
            gsServiceAdd:{
                min:"Value must be 0-5",
                max:"Value must be 0-5"
            },
            gsValueAdd:{
                min:"Value must be 0-5",
                max:"Value must be 0-5"
            }
        }
    });

    return form.valid();
}

/**
 * Check validation for Modifying a review
 * @returns {*|jQuery|boolean}
 */
function gsDoValidate_gsFrmModifyReview() {
    var form=$("#gsFrmModifyReview");
    form.validate({
        rules:{
            gsBusinessNameModify:{
                required: true,
                minlength:2,
                maxlength: 20
            },
            gsReviewerEmailModify:{
                required: true,
                conestogaEmailcheck:true,
                emailCheck:true
            },
            gsReviewDateModify:{
                required:true
            },
            gsFoodQualityModify:{
                min:0,
                max:5
            },
            gsServiceModify:{
                min:0,
                max:5
            },
            gsValueModify:{
                min:0,
                max:5
            }
        },
        messages:{
            gsBusinessNameModify:{
                required: "Business Name is required",
                minlength:"Length must be 2-20 characters long",
                maxlength:"Length must be 2-20 characters long"
            },
            gsReviewerEmailModify:{
                required: "Email is required",
                conestogaEmailcheck:"Email must be a conestoga email",
                emailCheck: "Email is not valid"
            },
            gsReviewDateModify:{
                required:"Review data is required"
            },
            gsFoodQualityModify:{
                min:"Value must be 0-5",
                max:"Value must be 0-5"
            },
            gsServiceModify:{
                min:"Value must be 0-5",
                max:"Value must be 0-5"
            },
            gsValueModify:{
                min:"Value must be 0-5",
                max:"Value must be 0-5"
            }
        }
    });

    return form.valid();
}

jQuery.validator.addMethod("conestogaEmailcheck",
    function (value, element) {
        var regex=/^.+conestogac.on.ca$/;

        return this.optional(element) || regex.test(value);
    }, "Custom email checker");

jQuery.validator.addMethod("emailCheck",
    function (value, element) {
        var regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        return this.optional(element) || regex.test(value);
    }, "Custom email checker");
