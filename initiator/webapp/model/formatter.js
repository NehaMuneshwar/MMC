sap.ui.define([], function () {
    "use strict";

    return {
        concatenateStatusAndSubject: function (status, levelName) {
            var statusText;
        
            if (status === "READY") {
                statusText = "Pending with " + levelName;
            } else if (status === "COMPLETED") {
                return "PENDING APPROVAL";
            } else {
                statusText = status;
            }
        
            return statusText;
        },


        statusColorFormatter: function (status) {
            if (status === "READY" || status === "COMPLETED") {
                return "color: orange;";
            } else {
                return "orangeText";
            }
        },
        statusText: function (Status) {
            if (Status === "RUNNING") {
                return "Started the Process";
            } else {
                return Status;
            }
        },
        statusModify: function (STATUS) {
            if (STATUS === "RUNNING") {
                return "Started the Process";
            }
            else if (STATUS === "READY") {
                return "Created the Task";
            } else if (STATUS === "COMPLETED") {
                return "Completed the Task";
            } else {
                return STATUS;
            }
        },

        getLevelName1: function(levelName, status){
            if (status === "COMPLETED") {
                return "PENDING APPROVAL"; 
            } else if (status === "READY") {
                if (levelName) {
                    var keyValueMap = {
                        "FINANCE": "Finance",
                        "SALES_MARKETING": "Sales Marketing",
                        "PRODUCTION": "Production Plant",
                        "QUALITY": "Quality",
                        "PROCUREMENT": "Procurement",
                        "STORE": "Store"
                    };
                    var levelDisplayName = keyValueMap[levelName];
                    if (levelDisplayName) {
                        return "PENDING with " + levelDisplayName;
                    }
                }
            } else {
                if (levelName) {
                    var keyValueMap = {
                        "FINANCE": "Finance",
                        "SALES_MARKETING": "Sales Marketing",
                        "PRODUCTION": "Production Plant",
                        "QUALITY": "Quality",
                        "PROCUREMENT": "Procurement",
                        "STORE": "Store"
                    };
                    return keyValueMap[levelName];
                }
            }
        }
        

    };
});