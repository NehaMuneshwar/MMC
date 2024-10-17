sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageBox",
        "sap/ui/core/UIComponent",
        "../model/formatter",
        "sap/ui/core/format/DateFormat",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/comp/filterbar/FilterBar",
        "sap/ui/comp/filterbar/FilterGroupItem",
        "sap/ui/core/BusyIndicator"

    ],
    function (Controller, JSONModel, MessageBox, UIComponent, formatter, DateFormat, Filter, FilterOperator, FilterBar, FilterGroupItem, BusyIndicator) {
        "use strict";
        var that;
        var modulePath;

        return Controller.extend("com.ibs.materialcreate.initiator.controller.Master", {
            formatter: formatter,
            onInit: function () {
                that = this;
                //  BusyIndicator.show();
               
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("route").attachPatternMatched(this.onRouteMatched, this)

            },

            onRouteMatched: function () {
                // BusyIndicator.show();
                
                setTimeout(() => {
                    this.getUserData();
                    // this.OnGetApi();
                }, 1000);

            },
            _getRuntimeBaseURL: function () {
                var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                var appPath = appId.replaceAll(".", "/");
                var appModulePath = jQuery.sap.getModulePath(appPath);

                return appModulePath;
            },
            formatDate: function (date) {
                var oDateFormat = DateFormat.getDateInstance({ style: "medium" });
                return oDateFormat.format(new Date(date));
            },
            _applyStatusFilter: function () {
                var oList = this.byId("listId");
                var oBinding = oList.getBinding("items");
                var oRunningFilter = new Filter("status", FilterOperator.EQ, "RUNNING");
                oBinding.filter([oRunningFilter]);
            },
            handleShowSearchBox: function () {
                var oView = this.getView();
                var sValue = oView.byId("searchFieldId").getValue();

                if (sValue) {
                    var oFilter = new Filter("startedBy", FilterOperator.BT, sValue);
                    var oList = oView.byId("listId");
                    var oBinding = oList.getBinding("items");

                    oBinding.filter(oFilter);
                } else {
                    oList.getBinding("items").filter([]);
                }
            },

            formatDateTime: function (date) {
                var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({ pattern: "yyyyMMddHHmmss" });
                var formattedDate = oDateFormat.format(new Date(date));
                return "Material Creation  " + formattedDate;
            },
            formatDateTime2: function (date) {
                var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({ pattern: "yyyyMMddHHmmss" });
                var formattedDate = oDateFormat.format(new Date(date));
                return "Material Creation  " + formattedDate;
            },

            getUserData: function () {
                debugger
                var oThisController = this;
                var url;
                url = oThisController._getRuntimeBaseURL() + "/user-api/attributes";
               
                    $.ajax({
                        url: url,
                        type: 'GET',
                        contentType: 'application/json',
                        success: function (data, response) {
                            debugger;
                            var UserEmail = data.email
                            that.getOwnerComponent().getModel("context").setProperty("/LogInUser", UserEmail);
                            that.OnGetApi();
                        },
                        error: function (oError) {
                            debugger
                        }
                    });
                
            },
            OnGetApi: function () {
                debugger;
                //that.getView().setBusy(true);
                var UserEmail = that.getOwnerComponent().getModel("context").getProperty("/LogInUser");
                var oThisController = this;
                var aData = jQuery.ajax({
                    type: "GET",
                    contentType: "application/xml",
                    // url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/workflow/rest/v1/workflow-instances?$orderby=startedAt%20desc&$inlinecount=allpages&definitionId=us10.ibs-portal-dev.materialcreation.materialMasterCreationMainProcess",
                    url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/public/workflow/rest/v1/workflow-instances?$orderby=startedAt%20desc&$top=1000&$inlinecount=allpages&$expand=attributes&definitionId=us10.ibs-portal-dev.materialcreation.materialMasterCreationMainProcess&status=RUNNING&startedBy="+UserEmail+"",
                    method: "GET",
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (odata, response, data, textStatus, jqXHR) {
                        debugger
                         BusyIndicator.hide()
                        var requestNo = "Material Creation " + odata[0].attributes[0].value;
                        var ReqNo = that.getOwnerComponent().getModel("context").setProperty("/REQUESTNO", requestNo);
                        // var array = [];

                        // for (var i = 0; i < odata.length; i++) {
                        //     odata[i].materialNumber = 100000000 + (odata.length - i) + "     ";

                        //     if (odata[i].startedBy === UserEmail && (odata[i].status === "RUNNING")) {
                        //         array.push(odata[i]);
                        //     }
                        // }
                        var abc = new JSONModel(odata);
                        that.getView().setModel(abc, "apidata");

                        var id1 = odata[0].rootInstanceId;
                        var Mnumber = odata[0].startedAt
                        var Status = odata[0].status
                        console.log("id - " + id1 + " -- Mnumber -- " + Mnumber);
            
                        //that.getView().setBusy(true);
                         var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                        oRouter.navTo("route1", {
                            rootInstanceId: id1,
                            materialNumber: requestNo,
                            startedAt: that.formatDate(Mnumber)
                        }, false)

                        that.getOwnerComponent().getModel("context").setProperty("/NewMaterial", 100000000 + (odata.length + 1));



                    },
                    error: function (error) { debugger }

                });
            },


            OnTotalCountApi: function () {
                debugger;
                var UserData = that.getOwnerComponent().getModel("context").getProperty("/LogInUser");
                var oThisController = this;
                var aData = jQuery.ajax({
                    type: "GET",
                    contentType: "application/xml",
                    url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/workflow/rest/v1/workflow-instances?$orderby=startedAt%20desc&$inlinecount=allpages&definitionId=us10.ibs-portal-dev.materialmastercreation1.materialMasterCreationMainProcess",
                    method: "GET",
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (odata, response, data, textStatus, jqXHR) {
                        debugger
                        var abc = new JSONModel(odata);
                        that.getView().setModel(abc, "totalCount");
                    },
                    error: function (error) { debugger }

                });
            },


            OnAddButton: function () {
                debugger
              var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("route2", false)
            },
            OnIdPress: function (oEvent) {
                debugger
                that = this;
                
                var id = oEvent.getParameter("listItems")[0].getAggregation("attributes")[1].getProperty("text");
                var Date = oEvent.getParameter("listItems")[0].getAggregation("attributes")[0].getProperty("text")
                var Status = oEvent.getParameter("listItems")[0].getAggregation("firstStatus").getProperty("text");
                var sender1 = oEvent.getParameter("listItems")[0].getProperty("title");
                this.getOwnerComponent().getModel("context").setProperty("/LengthData", sender1);
                this.getOwnerComponent().getModel("context").setProperty("/ID", id);
                this.getOwnerComponent().getModel("context").setProperty("/Timestamp", Date);
                this.getOwnerComponent().getModel("context").setProperty("/Status", Status);

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("route1", {
                    rootInstanceId: id,
                    materialNumber: sender1,
                    startedAt: Date
                 }, false)

            },

        });
    }
);
