sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/comp/filterbar/FilterBar",
    "sap/ui/comp/filterbar/FilterGroupItem",
    "sap/m/Input",
    "sap/ui/core/UIComponent",
    "sap/m/Label",
    "sap/ui/layout/form/SimpleForm",
    "sap/uxap/ObjectPageSection",
    "sap/uxap/ObjectPageSubSection",
    "sap/ui/core/Fragment",
    "sap/ui/core/BusyIndicator",
    "../model/formatter"
],
    function (Controller, JSONModel, MessageBox, Filter, FilterOperator, FilterBar, FilterGroupItem, Input, UIComponent, Label, SimpleForm, ObjectPageSection, ObjectPageSubSection, Fragment, BusyIndicator, formatter) {
        "use strict";
        var oDataModel;
        var that; var jdata; var levelarray;
        var acs_token; var sLevelName = ""; var data; var SubId;
        var SectionCount = 1; 
        //var SubId2; 
        var count = 1;
        var condition;
        var LeveleName, Level1, Level2, Level3, Level4, Level5;
        var oDataModel1, oDataModel2, oDataModel3, oDataModel4, oDataModel5, oDataModel6;
        return Controller.extend("com.ibs.materialcreate.initiator.controller.View1", {
            formatter: formatter,
            onInit: function () {
                
                that = this;
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("route1").attachPatternMatched(this.onRouteMatched, this)

                var viewModel = this.getOwnerComponent().getModel("context");
                data = this.getOwnerComponent().getModel("context").getData();


                // that.getUserData();
                // that.OnGetApi();
                // that.OnContextApi();
                // that.OnReadPlant();
                // that.OnReadMaterialType();
                // that.OnReadDivision();
                // that.OnReadCompany();
                // that.OnReadStorageLocation();
                // that.OnReadMaterialGroup();
                // that.OnReadBaseUnitOfMeasure();


                // that.getOwnerComponent().getModel("contextModel").getProperty("levels/LEVEL_1");

                var oModel = this.getOwnerComponent().getModel("context");
                // this.getView().setModel(oModel, "View1Model");
                this.getOwnerComponent().getModel("context").setProperty("/sideContentVisible", false);
            },
            onRouteMatched: function (oEvent) {
                
                // BusyIndicator.show()
                that = this;


                // var oRouter = UIComponent.getRouterFor(this);
                // oRouter.navTo("route", false)

                var id = oEvent.getParameters().arguments.rootInstanceId
                var materialNumber = oEvent.getParameters().arguments.materialNumber
                var startedAt = oEvent.getParameters().arguments.startedAt
              
                this.getOwnerComponent().getModel("context").setProperty("/ID", id);
                this.getOwnerComponent().getModel("context").setProperty("/LengthData", materialNumber);
                this.getOwnerComponent().getModel("context").setProperty("/Timestamp", startedAt);//Timestamp

                // that.OnGetApi();


                data = {
                    "definitionId": "us10.ibs-portal-dev.materialcreation.materialMasterCreationMainProcess",

                    "initiator": {
                        "MATERIAL_TYPE": "",
                        "PLANT": "",
                        "COMPANY": "",
                        "MATERIAL_GROUP": "",
                        "MATERIAL_DESCRIPTION": "",
                        "BASE_UNIT_OF_MEASURE": "",
                        "CATEGORY": "",
                        "DIVISION": "data.Division",
                        "GEN_ATEM_CAT_GROUP": "",
                        "MATERIAL_TYPE_NAME": "ata.MATERIAL_TYPE_NAME",
                        "PLANT_NAME": "data.PLANT_NAME",
                        "COMPANY_NAME": "a.COMPANY_NAME",
                        "MATERIAL_GROUP_TEXT": "ata.MATERIAL_GROUP_TEXT",
                        "UOM_LONG_NAME": "",
                        "DIVISION_NAME": "data.DIVISION_NAME",
                    },
                    "procurement": {
                        "PURCHASING_GROUP": "",
                        "PO_UNIT_OF_MEASURE": "",
                        "PURCHASING_VALUE_KEY": "",
                        "GOOD_RECIEPT_PROCESSING_TIME": "",
                        "AUTOMATIC_PO_ALLOWED": false,
                        "ALTERNATIVE_UOM_TO_STOCKKEEPING": "",
                        "DENOMINATOR_CONVERSION_TO_BUOM": "",
                        "NUMERATOR_CONVERSION_TO_BUOM": "",
                        "INTERNATIONAL_ARTICLE_NUMBER": "",
                        "CATEGORY_OF_INTERNATION_ARTICLE_NO": "",
                        "LENGTH_UOM": "",
                        "WIDTH_UOM": "",
                        "HEIGHT_UOM": "",
                        "UNIT_OF_DIMENSION_LWM": "",
                        "VOLUME_UOM": "",
                        "VOLUME_UNIT_UOM": "",
                        "GROSS_WEIGHT_UOM": "",
                        "WEIGHT_UNIT_UOM": "",
                        "PURCHASING_GROUP_TEXT": "",
                        "PO_UNIT_OF_MEASURE_TEXT": "",
                        "PURCHASING_VALUE_KEY_TEXT": ""
                    },
                    "production_plant": {
                        "MRP_GROUP": "",
                        "ABC_INDICATOR": "",
                        "MRP_TYPE": "",
                        "MRP_CONTROLLER": "",
                        "REORDER_POINT": "",
                        "LOT_SIZING_PROC": "",
                        "MINIMUM_LOT_SIZE": "",
                        "MAXIMUM_LOT_SIZE": "",
                        "FIXED_LOT_SIZE": "",
                        "MAX_STOCK_LEVEL": "",
                        "ASSEMBLY_SCRAP_PERCENTAGE": "",
                        "ROUNDING_PROFILE": "",
                        "PROCUREMENT_TYPE": "",
                        "SPECIAL_PROCUREMENT_TYPE": "",
                        "INDICATOR_BACKFLUSH": "",
                        "STORAGE_LOCATION_FOR_EXTERNAL_PROC": "",
                        "PROD_STORAGE_LOCATION": "",
                        "STOCK_DETERMINATION_GROUP": "",
                        "SCHEDULING_MARGIN_KEY": "",
                        "SAFETY_STOCK": "",
                        "MINIMUM_SAFETY_STOCK": "",
                        "SAFETY_TIME_INDICATOR": "",
                        "PLANNING_STRATEGY_GROUP": "",
                        "DEPENDENT_REQUIREMENT_FOR_INDIVIDUAL": "",
                        "REPETATIVE_MANUFACTURING_ALLOWED": false,
                        "REPETATIVE_MANUFACTURING_PROFILE": "",
                        "MRP_GROUP_TEXT": "",
                        "ABC_INDICATOR_TEXT": "",
                        "MRP_TYPE_TEXT": "",
                        "MRP_CONTROLLER_TEXT": "",
                        "LOT_SIZING_PROCEDURE_TEXT": "",
                        "PROCUREMENT_TYPE_TEXT": "",
                        "SPECIAL_PROCUREMENT_TYPE_TEXT": "",
                        "INDICATOR_BACKFLUSH_TEXT": "",
                        "STORAGE_LOCATION_FOR_EXTERNAL_PROC_TEXT": "",
                        "PROD_STORAGE_LOCATION_TEXT": "",
                        "STOCK_DETERMINATION_GROUP_TEXT": "",
                        "SCHEDULING_MARGIN_KEY_TEXT": "",
                        "SAFETY_TIME_INDICATOR_TEXT": "",
                        "PLANNING_STRATEGY_GROUP_TEXT": "",
                        "CHECK_GROUP_FOR_AVAILABILITY_TEXT": "",
                        "DEPENDENT_REQUIREMENT_INDIVIDUAL_TEXT": "",
                        "REPETATIVE_MANUFACTURING_ALLOWED_TEXT": "",
                        "REPETATIVE_MANUFACTURING_PROFILE_TEXT": "",
                        "CHECK_GROUP_FOR_AVAILABILTIY": ""
                    },
                    "store": {
                        "STORAGE_LOCATION": "",
                        "STORAGE_BIN": "",
                        "MAXIMUM_STORAGE_PERIOD": "",
                        "TIME_UNIT": "",
                        "BATCH_MGMT_REQUIRE_INDICATOR":false,
                        "STORAGE_LOCATION_TEXT": "",
                        "STORAGE_BIN_TEXT": "",
                        "TIME_UNIT_TEXT": "",
                        "BATCH_MGMT_REQUIRE_INDICATOR_TEXT": ""
                    },
                    "quality": {
                        "CATLOG_PROFILE": "",
                        "QM_IN_PROC_ACTIVE": false,
                        "HANDLING_UNIT_TYPE": "",
                        "INSPECTION_TYPE_MATERIAL_COMBINATION_IS_ACTIVE":"",
                        "MINIMUM_REMAINING_SHELF_LIFE": "",
                        "TOTAL_SHELF_LIFE": "",
                        "PERIOD_INDICATOR_SLED": "",
                        "MINIMUM_REMAINING_SHELF_LIFE_TEXT": "",
                        "TOTAL_SHELF_LIFE_TEXT": "",
                        "PERIOD_INDICATOR_SLED_TEXT": "",
                        "INSPECTION_SETUP": "",
                        "INSPECTION_TYPE_MATERIAL_COMBINATION_IS_ACTIVE_B":false
                    },
                    "finance": {
                        "CONTROL_CODE": "",
                        "PROFIT_CENTER": "",
                        "VALUATION_TYPE": "",
                        "VALUATION_CATEGORY": "",
                        "VALUATION_CLASS": "",
                        "PRICE_CONTROL_INDICATOR": "",
                        "MOVING_AVG_PRICE_PER_PERIODIC_UNIT_PRICE": "",
                        "PRICE_UNIT": "",
                        "FUTURE_PRICE": "",
                        "ORIGIN_OF_MATERIAL": "",
                        "MATERIAL_COST_WITH_QUANTITY_STRUCTURE": "",
                        "MATERIAL_RELATED_ORIGIN": "",
                        "FUTURE_PLANNED_PRICE_1": "",
                        "DATE_FROM_FUTURE_PLAN1_VALID": "",
                        "FUTURE_PLANNED_PRICE_2": "",
                        "DATE_FROM_FUTURE_PLAN2_VALID": "",
                        "DEPARTURE_COUNTRY_GOODS_SENT": "",
                        "CONTROL_CODE_TEXT": "",
                        "DEPARTURE_COUNTRY_GOODS_SENT_TEXT": "",
                        "PROFIT_CENTER_TEXT": "",
                        "VALUATION_TYPE_TEXT": "",
                        "VALUATION_CATEGORY_TEXT": "",
                        "VALUATION_CLASS_TEXT": "",
                        "PRICE_CONTROL_INDICATOR_TEXT": "",
                        "to_SalesText": {
                            "results": [
                                {
                                    "Product": "",
                                    "Country_Text": "",
                                    "TaxCategory_Text": "",
                                    "TaxClassification_Text": ""
                                }
                            ]
                        },
                        "to_SalesTax": {
                            "results": [
                                {
                                    "country": "",
                                    "TaxCategory": "",
                                    "TaxClassification": "",
                                    "Product": ""
                                }
                            ]
                        }
                    },
                    "sales_marketing": {
                        "SALES_ORGANIZATION": "",
                        "DISTRIBUTION_CHANNEL": "",
                        "SALES_UNIT": "",
                        "DELIVERING_PLANT": "",
                        "CASH_DISCOUNT_INDICATOR": false,
                        "MIN_ORDER_QUANTITY_BUOM": "",
                        "MIN_DELIVERY_QUANTITY": "",
                        "DELIVERY_UNIT": "",
                        "UOM_DELIVERY_UNIT": "",
                        "ROUNDING_PROFILE": "",
                        "MATERIAL_STATISTIC_GROUP": "",
                        "ITEM_CATEGORY_GROUP": "",
                        "PRICING_REFERENCE_MATERIAL": "",
                        "MATERIAL_PRICE_GROUP": "",
                        "ACCOUNT_ASSIGNMENT_GROUP": "",
                        "COMISSION_GROUP": "",
                        "MATERIAL_GROUP_1": "",
                        "MATERIAL_GROUP_2": "",
                        "MATERIAL_GROUP_3": "",
                        "MATERIAL_GROUP_4": "",
                        "MATERIAL_GROUP_5": "",
                        "TRANSPORTATION_GROUP": "",
                        "LOADING_GROUP": "",
                        "SALES_ORGANIZATION_TEXT": "",
                        "DISTRIBUTION_CHANNEL_TEXT": "",
                        "SALES_UNIT_TEXT": "",
                        "DELIVERING_PLANT_TEXT": "",
                        "UOM_DELIVERY_UNIT_TEXT": "",
                        "ROUNDING_PROFILE_TEXT": "",
                        "MATERIAL_STATISTIC_GROUP_TEXT": "",
                        "ITEM_CATEGORY_GROUP_TEXT": "",
                        "PRICING_REFERENCE_MATERIAL_TEXT": "",
                        "MATERIAL_PRICE_GROUP_TEXT": "",
                        "ACCOUNT_ASSIGNMENT_GROUP_TEXT": "",
                        "COMISSION_GROUP_TEXT": "",
                        "MATERIAL_GROUP_1_TEXT": "",
                        "MATERIAL_GROUP_2_TEXT": "",
                        "MATERIAL_GROUP_3_TEXT": "",
                        "MATERIAL_GROUP_4_TEXT": "",
                        "MATERIAL_GROUP_5_TEXT": "",
                        "TRANSPORTATION_GROUP_TEXT": "",
                        "LOADING_GROUP_TEXT": ""
                    },
                    "levels": {
                        "LEVEL_1": "",
                        "LEVEL_2": "",
                        "LEVEL_3": "",
                        "LEVEL_4": "",
                        "LEVEL_5": "",
                        "MAX_LEVEL": "",
                        "LEVEL_NAME": "",
                        "LEVEL_COUNT": "",
                        "NA_LEVEL": ""
                    },
                    "request_no": ""

                };

                var oModel = new JSONModel(data);
                that.getView().setModel(oModel, "contextModel");
                
                that.SubProcessApi();
                that.OnContextApi();
                that.getlevels(data);
                that.ApprovalApi();
               

            },
            _getRuntimeBaseURL: function () {
                var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                var appPath = appId.replaceAll(".", "/");
                var appModulePath = jQuery.sap.getModulePath(appPath);

                return appModulePath;
            },


            getlevels: function (jobj) {
                var Status = this.getOwnerComponent().getModel("context").getProperty("/ShowStatus");
                var levelname = this.getOwnerComponent().getModel("context").getProperty("/LevelsName");
                var keyValueMap = {
                    "FINANCE": "Finance",
                    "SALES_MARKETING": "Sales Marketing",
                    "PRODUCTION": "Production Plant",
                    "QUALITY": "Quality",
                    "PROCUREMENT": "Procurement",
                    "STORE": "Store"
                };

                var levels = jobj?.levels || {};
                var level1 = Level1,
                    level2 = Level2,
                    level3 = Level3,
                    level4 = Level4,
                    level5 = Level5,
                    levelName = LeveleName;


                var sBaseFragmentFilePath = "com.ibs.materialcreate.initiator.view.Fragment.";
                var oObjectPageLayout = this.byId("objectPageLayout");
                var sFragName = "";

                var levelArray = [level1, level2, level3, level4, level5];

                var sections = oObjectPageLayout.getSections();
                for (var j = 0; j < sections.length; j++) {
                    if (sections[j].getTitle() !== "Initiator") {
                        oObjectPageLayout.removeSection(sections[j]);
                        sections[j].destroy();
                    }
                }

                var countEmpty = 0;
                for (var i = 0; i < levelArray.length; i++) {
                    if (levelArray[i] === "") {
                        countEmpty++;
                    }
                }
                 var maxLevel = levelArray.length - countEmpty;
                if (Status === "READY") {
                    maxLevel -= 1;
                } else if (Status === "COMPLETED") {
                    maxLevel = levelArray.length;
                }
            

                for (var i = 0; i < maxLevel; i++) {
                    if (levelArray[i]) {
                        var oSubSection = new ObjectPageSubSection();
                        var sFragPath = sBaseFragmentFilePath + levelArray[i];
                        this.getView().getModel("contextModel").setProperty("/" + levelArray[i], true);
                        this._loadFragment(sFragPath, oSubSection);
                        var title = keyValueMap[levelArray[i]];

                        var oSection = new ObjectPageSection({
                            title: title,
                            subSections: [oSubSection],
                            visible: true,
                            id: 'idobjsubsection' + i
                        });
                        oObjectPageLayout.addSection(oSection);
                    }
                 }
                 BusyIndicator.hide();
            },

            _loadFragment: function (sFragmentPath, oObjectPageSubSection) {
                var oView = this.getView();
                Fragment.load({
                    id: oView.getId(),
                    name: sFragmentPath,
                    controller: this
                }).then(function (oFragment) {
                    oObjectPageSubSection.addBlock(oFragment);
                }).catch(function (oError) {
                    console.error("Error loading fragment: ", oError);
                });
            }
            ,

            getUserData: function () {
                
                var oThisController = this;
                var url;
                url = oThisController._getRuntimeBaseURL() + "/user-api/attributes";
                return new Promise(function (resolve, reject) {
                    $.ajax({
                        url: url,
                        type: 'GET',
                        contentType: 'application/json',
                        success: function (data, response) {
                            
                            var UserEmailId = data.email
                            that.getOwnerComponent().getModel("context").setProperty("/LogInUser", UserEmailId);
                        },
                        error: function (oError) {
                            
                        }
                    });
                });
            },
            onMaterialTypeChange: function () {
                
                var oView = this.getView().getModel("context");
                var a = oView.getProperty("/MATERIALTYPE");
                var b = oView.getProperty("/PLANT");
                if (a && b) {
                    this.getView().getModel("context").setProperty("/EditableTemp", true);
                }

            },
            onChange: function (oEvent) {
                
                var that = this;
                var DescriptionValue = oEvent.getSource().getProperty("selectedKey")
                that.onMaterialTypeChange();
                that.getView().getModel("context").setProperty("/MaterialTypeName", DescriptionValue);
            },
            onChange1: function (oEvent) {
                var that = this;
                var DescriptionValue1 = oEvent.getSource().getProperty("selectedKey")
                that.getView().getModel("context").setProperty("/PlantName", DescriptionValue1);
                that.onMaterialTypeChange();
            },
            onChange2: function (oEvent) {
                var that = this;
                var DescriptionValue2 = oEvent.getSource().getProperty("selectedKey")
                that.getView().getModel("context").setProperty("/CompanyCodeName", DescriptionValue2);

            },
            onChange4: function (oEvent) {
                
                var that = this;
                var DescriptionValue3 = oEvent.getSource().getProperty("selectedKey")
                that.getView().getModel("context").setProperty("/MaterialGroupText", DescriptionValue3);

            },
            onChange5: function (oEvent) {
                var that = this;
                var DescriptionValue4 = oEvent.mParameters.value
                that.getView().getModel("context").setProperty("/UnitOfMeasureLongName", DescriptionValue4);

            },
            onChange5: function (oEvent) {
                var that = this;
                var DescriptionValue5 = oEvent.mParameters.value
                that.getView().getModel("context").setProperty("/DivisionName", DescriptionValue5);

            },
            OnReadPlant: function () {
                
                var that = this;
                oDataModel = this.getOwnerComponent().getModel();
                oDataModel.read("/ZZ1_Plant", {
                    success: function (oData, oResponse) {
                        
                        var myModel = new JSONModel(oData);
                        that.getView().setModel(myModel, "PlantModel");


                    }
                })
            },
            OnReadMaterialType: function () {
                
                var that = this;
                var sEntity = "/I_MaterialTypeText";
                oDataModel1 = this.getOwnerComponent().getModel("MaterialTypeModel");
                oDataModel1.read(sEntity, {
                    success: function (oData, oResponse) {
                        
                        var myModel1 = new JSONModel(oData);
                        that.getView().setModel(myModel1, "MaterialTypeModel")
                    },
                    error: function (error) {

                    }
                })

            },

            OnReadCompany: function () {
                
                var that = this;
                oDataModel2 = this.getOwnerComponent().getModel("CompanyModel");
                oDataModel2.read("/ZZ1_Company", {
                    success: function (oData, oResponse) {
                        
                        var myModel2 = new JSONModel(oData);
                        that.getView().setModel(myModel2, "CompanyTypeModel");

                    }
                })
            },
            OnReadStorageLocation: function () {
                
                var that = this;
                oDataModel3 = this.getOwnerComponent().getModel("StorageLocation");
                oDataModel3.read("/ZZ1_StorageLocation", {
                    success: function (oData, oResponse) {
                        
                        var myModel3 = new JSONModel(oData);
                        that.getView().setModel(myModel3, "StorageLocationModel");

                    }
                })
            },
            OnReadMaterialGroup: function () {
                
                var that = this;
                oDataModel4 = that.getOwnerComponent().getModel("materialtype");
                oDataModel4.read("/I_MaterialGroupText", {
                    success: function (oData, oResponse) {
                        
                        var myModel4 = new JSONModel(oData);
                        that.getView().setModel(myModel4, "MaterialGroupModel");

                    },
                    error: function (error) {
                        
                    }
                })
            },
            OnReadBaseUnitOfMeasure: function () {
                
                var that = this;
                oDataModel5 = this.getOwnerComponent().getModel("UnitOfMeasure");
                oDataModel5.read("/ZZ1_UnitOfMeasure", {
                    success: function (oData, oResponse) {
                        
                        var myModel5 = new JSONModel(oData);
                        that.getView().setModel(myModel5, "UnitOfMeasureModel");

                    }
                })
            },
            OnReadDivision: function () {
                
                var that = this;
                oDataModel6 = this.getOwnerComponent().getModel("Division");
                oDataModel6.read("/ZZ1_Division", {
                    success: function (oData, oResponse) {
                        
                        var myModel6 = new JSONModel(oData);
                        that.getView().setModel(myModel6, "DivisionModel");

                    }
                })
            },

          
            // OnGetApi: function () {
                
            //     var oThisController = this;
            //     var UserEmail = that.getOwnerComponent().getModel("context").getProperty("/LogInUser");
            //     var id = this.getOwnerComponent().getModel("context").getProperty("/ID");
            //     var aData = jQuery.ajax({
            //         type: "GET",
            //         contentType: "application/xml",
            //         url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/workflow/rest/v1/workflow-instances?$filter=id eq '" + id + "'&startedBy="+UserEmail+"",
            //         method: "GET",
            //         async: false,
            //         headers: {
            //             "X-CSRF-Token": "Fetch"
            //         },
            //         success: function (odata, response, data, textStatus, jqXHR) {
                        

            //             var abc = new JSONModel(odata);
            //             that.getView().setModel(abc, "apidata1");

            //         },
            //         error: function (error) {  }

            //     });
            // },
            OnStartGetApi: function () {
                
                //that.getView().setBusy(true);
                var UserEmail = that.getOwnerComponent().getModel("context").getProperty("/LogInUser");
                var WorkflwoId = this.getOwnerComponent().getModel("context").getProperty("/ID");
                var oThisController = this;
                var aData = jQuery.ajax({
                    type: "GET",
                    contentType: "application/xml",
                    url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/workflow/rest/v1/workflow-instances?$orderby=startedAt%20desc&$inlinecount=allpages&definitionId=us10.ibs-portal-dev.materialcreation.materialMasterCreationMainProcess&id="+WorkflwoId+"",
                    method: "GET",
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (odata, response, data, textStatus, jqXHR) {
                        
                        BusyIndicator.hide();
                        var array = [];
                        for (var i = 0; i < odata.length; i++) {
                            if (odata[i].startedBy === UserEmail && (odata[i].status === "RUNNING")) {
                                array.push(odata[i]);
                            }
                            var Initiate = new JSONModel(odata);
                            that.getView().setModel(Initiate, "StatWorkflowModel");
                            that.CombinedWorkflow();
                        }
                    },
                    error: function (error) { 
                    BusyIndicator.hide();
                    }
                });
            },
            SubProcessApi: function (oEvent) {
                //that.getView().setBusy(true);
                var oThisController = this;
                var id = this.getOwnerComponent().getModel("context").getProperty("/ID");
            
                jQuery.ajax({
                    type: "GET",
                    contentType: "application/xml",
                    url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/public/workflow/rest/v1/workflow-instances?$orderby=startedAt%20desc&$top=100&$inlinecount=none&definitionId=us10.ibs-portal-dev.materialcreation.sP_MaterialMasterCreationRequest&rootInstanceId=" + id,
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (odata) {
                        BusyIndicator.hide();
                        if (odata && odata.length > 0) {
                            var SubId = odata[0].id;
                            var abc1 = new JSONModel(odata);
                            oThisController.getView().setModel(abc1, "SubProcessData");
                            oThisController.AllSubProcessApi(SubId);
                        } else {
                            console.error("No data returned from SubProcessApi");
                        }
                    },
                    error: function (error) {
                        console.error("Error in SubProcessApi: ", error);
                        BusyIndicator.hide();
                    }
                });
            },

            AllSubProcessApi: function (SubId) {
                //that.getView().setBusy(true);
                var oThisController = this;
                var Status = this.getOwnerComponent().getModel("context").getProperty("/ShowStatus");
                var Subject = this.getOwnerComponent().getModel("context").getProperty("/subjectData");
            
                jQuery.ajax({
                    type: "GET",
                    contentType: "application/xml",
                    url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/public/workflow/rest/v1/task-instances?$top=1&$inlinecount=none&$orderby=createdAt%20desc&workflowInstanceId=" + SubId,
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (odata) {
                        BusyIndicator.hide();
                        if (odata && odata.length > 0) {
                            var SubId2 = odata[0].id;
                            var StatusShowing = odata[0].status;
                            var subject = odata[0].subject;
                            var WorkflowID = odata[0].workflowInstanceId;
            
                            oThisController.getOwnerComponent().getModel("context").setProperty("/ShowStatus", StatusShowing);
                            oThisController.getOwnerComponent().getModel("context").setProperty("/subjectData", subject);
                            oThisController.getOwnerComponent().getModel("context").setProperty("/WORKFLOW", WorkflowID);
            
                            var SubProcessFormData1 = new JSONModel(odata);
                            oThisController.getView().setModel(SubProcessFormData1, "SubProcessFormData");
                            oThisController.SubProcessContextApi(SubId2);
                            oThisController.WorkflowApi();
                            oThisController.OnStartGetApi();
                            oThisController.ApprovalApi();
                        } else {
                            console.error("No data returned from AllSubProcessApi");
                        }
                    },
                    error: function (error) {
                        console.error("Error in AllSubProcessApi: ", error);
                        BusyIndicator.hide();
                    }
                });
            },
            SubProcessContextApi: function (SubId2) {
                
                //that.getView().setBusy(true);
                var oThisController = this;
                var stratedAt = this.getOwnerComponent().getModel("context").getProperty("/ID");
                var Subject = this.getOwnerComponent().getModel("context").getProperty("/LevelsName");
                var aData = jQuery.ajax({
                    type: "GET",
                    contentType: "application/xml",
                    url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/public/workflow/rest/v1/task-instances/"+ SubId2+"/context",
                    method: "GET",
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (odata, response, data, textStatus, jqXHR) {
                        
                         BusyIndicator.hide()
                        var levelname= odata.levels.LEVEL_NAME
                        LeveleName = odata.levels
                        Level1 = odata.levels.LEVEL_1
                        Level2 = odata.levels.LEVEL_2
                        Level3 = odata.levels.LEVEL_3
                        Level4 = odata.levels.LEVEL_4
                        Level5 = odata.levels.LEVEL_5
                       

                      levelarray =[Level1,Level2,Level3,Level4,Level5];
                        

                        var SubContextModel1 = new JSONModel(odata);
                        that.getView().setModel(SubContextModel1, "SubProcessContext");
                       //that.getOwnerComponent().getModel("context").setProperty("/LevelsName", StatusLevel);
                        that.getOwnerComponent().getModel("context").setProperty("/LevelsName", levelname);
                        that.getView().getModel("contextModel").setProperty("/levels/LEVEL_1", LeveleName);

                    },
                    error: function (error) {  
                    BusyIndicator.hide();
                }
                });
            },

            OnContextApi: function () {
                
                //that.getView().setBusy(true);
                // var id = oEvent.getParameter("listItems")[0].getProperty("text")
                var oThisController = this;
                var id = this.getOwnerComponent().getModel("context").getProperty("/ID");
                var aData = jQuery.ajax({
                    type: "GET",
                    contentType: "application/xml",
                    url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/public/workflow/rest/v1/workflow-instances/" + id + "/context",
                    method: "GET",
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (odata, response, data, textStatus, jqXHR) {
                        
                        BusyIndicator.hide()
                        // LeveleName = odata.custom.level1
                        // Level1 = odata.decision_dS_DetermineLevels_1.Material_Master_Creation_Outputs.LEVELS.LEVEL_1
                        // Level2 = odata.decision_dS_DetermineLevels_1.Material_Master_Creation_Outputs.LEVELS.LEVEL_2
                        // Level3 = odata.decision_dS_DetermineLevels_1.Material_Master_Creation_Outputs.LEVELS.LEVEL_3
                        // Level4 = odata.decision_dS_DetermineLevels_1.Material_Master_Creation_Outputs.LEVELS.LEVEL_4
                        // Level5 = odata.decision_dS_DetermineLevels_1.Material_Master_Creation_Outputs.LEVELS.LEVEL_5

                        var abc1 = new JSONModel(odata);
                        that.getView().setModel(abc1, "contextapidata");

                        // that.getView().getModel("contextModel").setProperty("/levels/LEVEL_1", LeveleName);
                        //    that.OnIdPress();

                    },
                    error: function (error) { 
                        BusyIndicator.hide();
                     }

                });
            },

            onShowLog: function () {
                var oDynamicSideContent = this.getView().byId("DynamicSideContent");
                oDynamicSideContent.setSideContentVisibility("ShowAboveS");

                var oShowLogButton = this.getView().byId("showLogButton");
                var oHideLogButton = this.getView().byId("hideLogButton");
                //var oHideLogFooterButton = this.getView().byId("hideLogFooterButton");

                oShowLogButton.setVisible(false);
                oHideLogButton.setVisible(true);
                //oHideLogFooterButton.setVisible(true);
            },

            onHideLog: function () {
                var oDynamicSideContent = this.getView().byId("DynamicSideContent");
                oDynamicSideContent.setSideContentVisibility("NeverShow");

                var oShowLogButton = this.getView().byId("showLogButton");
                var oHideLogButton = this.getView().byId("hideLogButton");
                //var oHideLogFooterButton = this.getView().byId("hideLogFooterButton");

                oShowLogButton.setVisible(true);
                oHideLogButton.setVisible(false);
                //oHideLogFooterButton.setVisible(false);
            },

            onCloseEvent: function () {
                var oDynamicSideContent = this.getView().byId("DynamicSideContent");
                oDynamicSideContent.setSideContentVisibility("NeverShow");

                var oShowLogButton = this.getView().byId("showLogButton");
                var oHideLogButton = this.getView().byId("hideLogButton");
                //var oHideLogFooterButton = this.getView().byId("hideLogFooterButton");

                oShowLogButton.setVisible(true);
                oHideLogButton.setVisible(false);
                //oHideLogFooterButton.setVisible(false);
            },

            WorkflowApi: function () {
                
                //that.getView().setBusy(true);
                  var subject = this.getOwnerComponent().getModel("context").getProperty("/LevelsName");
                var workflowID = that.getOwnerComponent().getModel("context").getProperty("/WORKFLOW");
                var oThisController = this;
                var aData = jQuery.ajax({
                    type: "GET",
                    contentType: "application/xml",
                    url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/public/workflow/rest/v1/task-instances?$top=100&$inlinecount=none&$orderby=createdAt%20asc&workflowInstanceId=" + workflowID + "",
                    method: "GET",
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (odata, response, data, textStatus, jqXHR) {
                        
                        var workflow = new JSONModel(odata);
                        that.getView().setModel(workflow, "workfloModel");

                    },
                    error: function (error) {  
                        BusyIndicator.hide();
                    }
                });
            },
            CombinedWorkflow: function () {
                
                
                that.SubProcessContextApi();
                // var Subject = this.getOwnerComponent().getModel("context").getProperty("/LevelsName");
                levelarray =[Level1,Level2,Level3,Level4,Level5];

                var subject= that.getView().getModel("contextModel").getProperty("/levels/LEVEL_1", LeveleName);
                var oWorkfloModel = this.getView().getModel("workfloModel");
                var oStatWorkflowModel = this.getView().getModel("StatWorkflowModel");
                var i=0;
                 var aWorkfloData = oWorkfloModel ? oWorkfloModel.getProperty("/").map(function (item) {
            
                    return {
                        subject:levelarray[i++],
                        status: item.status,
                        startedAt: item.createdAt,
                        processor: item.processor
                    };
                }) : [];


                var aStatWorkflowData = oStatWorkflowModel ? oStatWorkflowModel.getProperty("/").map(function (item) {
                    return {
                        subject:levelarray[i++],
                        status: item.status,
                        startedAt: item.startedAt,
                        processor: item.startedBy
                    };
                }) : [];

                var aCombinedData = aWorkfloData.concat(aStatWorkflowData);
                var oCombinedModel = new JSONModel(aCombinedData);
                this.getView().setModel(oCombinedModel, "combinedModel");
            },
            ApprovalApi : function (){
                
                //that.getView().setBusy(true);
              var oThisController = this;
              var aData = jQuery.ajax({
                  type: "GET",
                  contentType: "application/xml",
                  url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/public/workflow/rest/v1/workflow-instances?$orderby=startedAt%20desc&$inlinecount=allpages&definitionId=us10.ibs-portal-dev.materialcreation.sP_ApprovalMaterialMasterCreationRequest",
                  method: "GET",
                  async: false,
                  headers: {
                      "X-CSRF-Token": "Fetch"
                  },
                  success: function (odata, response, data, textStatus, jqXHR) {
                      
                      BusyIndicator.hide()
                      var ApprovalId = odata[0].id;
                      var approvalModel = new JSONModel(odata);
                      that.getView().setModel(approvalModel, "approvalApiModel");
                      that.getOwnerComponent().getModel("context").setProperty("/approvalID", ApprovalId);
                      that.ApprovalContext();

                  },
                  error: function (error) { 
                    BusyIndicator.hide()
                   }
              });
            },
            ApprovalContext : function(){
                
                //that.getView().setBusy(true)
               var  approvalId = that.getOwnerComponent().getModel("context").getProperty("/approvalID");
                var oThisController = this;
                var aData = jQuery.ajax({
                    type: "GET",
                    contentType: "application/xml",
                    url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/public/workflow/rest/v1/workflow-instances/"+ approvalId+"/context",
                    method: "GET",
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (odata, response, data, textStatus, jqXHR) {
                        
                        BusyIndicator.hide()
                        //  var ApprovalId = odata[0].id;
                        var approvalModel = new JSONModel(odata);
                        that.getView().setModel(approvalModel, "approvalContextModel");
                        
                       
                    },
                    error: function (error) { 
                        BusyIndicator.hide()
                     }
                });
            }
        });
    });
