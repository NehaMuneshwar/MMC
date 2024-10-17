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
    "../model/formatter",
    "sap/ui/core/BusyIndicator"
],
    function (Controller, JSONModel, MessageBox, Filter, FilterOperator, FilterBar, FilterGroupItem, Input, UIComponent, formatter, BusyIndicator) {
        "use strict";
        var oDataModel;
        var that;
        var acs_token;
        var id; var Companycode;
        var materialNumber;
        var MaterialNumber;
        var formattedDate;
        var oformattedDatethat;
        var oDataModel1, oDataModel2, oDataModel3, oDataModel4, oDataModel5, oDataModel6;
        return Controller.extend("com.ibs.materialcreate.initiator.controller.View2", {
            formatter: formatter,
            onInit: function () {
                debugger
                that = this;
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("route2").attachPatternMatched(this.onRouteMatched, this)

                var viewModel = this.getOwnerComponent().getModel("context");
                // that.getUserData();
                // that.OnGetApi();
                // that.OnContextApi();
                that.OnReadPlant();
                that.OnReadMaterialType();
                that.OnReadDivision();
                that.OnReadCompany();
                that.OnReadStorageLocation();
                that.OnReadMaterialGroup();
                that.OnReadBaseUnitOfMeasure();
                that.OnReadGentItemGroup();

                var oModel = this.getOwnerComponent().getModel();
                this.getView().setModel(oModel, "View1Model");

            },

            onRouteMatched: function (oEvent) {
                debugger
                that = this;
                var materialNumber = oEvent.getParameters().arguments.materialNumber
                this.getOwnerComponent().getModel("context").setProperty("/LengthData", materialNumber);
                that.OnGetApi();
                that.OnContextApi();
                that.OnCountApi();

            },
            _getRuntimeBaseURL: function () {
                var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                var appPath = appId.replaceAll(".", "/");
                var appModulePath = jQuery.sap.getModulePath(appPath);

                return appModulePath;
            },
            // getUserData: function () {
            //     var url;
            //     url = modulePath + "/user-api/attributes";
            //     return new Promise(function (resolve, reject) {
            //         $.ajax({
            //             url: url,
            //             type: 'GET',
            //             contentType: 'application/json',
            //             success: function (data, response) {
            //                 debugger;
            //                 data = JSON.parse(data);
            //             },
            //             error: function (oError) {
            //                 debugger
            //             }
            //         });
            //     });
            // },
            onMaterialTypeChange: function () {
                debugger
                var oViewModel = that.getOwnerComponent().getModel("context");
                var a = oViewModel.getProperty("/MATERIALTYPE");
                var b = oViewModel.getProperty("/COMPANYNAME");
                var c = oViewModel.getProperty("/PLANT");


                if (a && b) {
                    oViewModel.setProperty("/plantfield", true);
                } else {
                    oViewModel.setProperty("/plantfield", false);
                }


                if (a && b && c) {
                    oViewModel.setProperty("/EditableTemp", true);
                } else {
                    oViewModel.setProperty("/EditableTemp", false);
                }



            },
            onChange: function (oEvent) {
                debugger
                var that = this;

                var DescriptionValue = oEvent.getSource().getProperty("selectedKey")
                that.getView().getModel("context").setProperty("/MaterialTypeName", DescriptionValue);
                that.onMaterialTypeChange();
            },
            onChange1: function (oEvent) {
                debugger
                var that = this
                plantname = oEvent.mParameters.newValue
                var DescriptionValue1 = oEvent.getSource().getProperty("selectedKey")
                that.getView().getModel("context").setProperty("/PlantName", DescriptionValue1);
                that.onMaterialTypeChange();

                oDataModel = this.getOwnerComponent().getModel();
                var oModel1 = this.getOwnerComponent().getModel("context");
                var PFilters = [];
                var plantname = oModel1.getProperty("/PLANT");

                var oFilter2 = new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, plantname);
                PFilters.push(oFilter2);
                oDataModel6 = this.getOwnerComponent().getModel("Division");
                oDataModel6.read("/Z_Division", {
                    filters: PFilters,
                    success: function (oData, oResponse) {
                        debugger;
                        var myModel6 = new JSONModel(oData);
                        that.getView().setModel(myModel6, "DivisionModel");
                    }
                })
            },
            
            onChange2: function (oEvent) {
                debugger
                var that = this;
                Companycode = oEvent.mParameters.newValue
                var DescriptionValue2 = oEvent.getSource().getProperty("selectedKey")
                that.getView().getModel("context").setProperty("/CompanyCodeName", DescriptionValue2);
                that.onMaterialTypeChange();

                oDataModel2 = this.getOwnerComponent().getModel("CompanyModel");
                var oModel = this.getOwnerComponent().getModel("context");
                var bFilters = [];

                var sCompanyName = oModel.getProperty("/COMPANYNAME");
                var oFilter1 = new sap.ui.model.Filter("CompanyCode", sap.ui.model.FilterOperator.EQ, Companycode);
                bFilters.push(oFilter1);
                oDataModel.read("/ZZ1_ValuationArea", {
                 filters: bFilters,
                    success: function (oData, oResponse) {
                        debugger;
                        var myModel = new JSONModel(oData);
                        myModel.setSizeLimit(10000);
                        that.getView().setModel(myModel, "PlantModel");

                    
                    }
                })

            },
            onChange4: function (oEvent) {
                debugger
                var that = this;
                var DescriptionValue3 = oEvent.getSource().getProperty("selectedKey")
                that.getView().getModel("context").setProperty("/MaterialGroupText", DescriptionValue3);

            },
            onChange7: function (oEvent) {
                debugger
                var that = this;
                var DescriptionValue7 = oEvent.getSource().getProperty("selectedKey")
                that.getView().getModel("context").setProperty("/ItemCategoryGroupName", DescriptionValue7);

            },
            onChange5: function (oEvent) {
                var that = this;
                var DescriptionValue4 = oEvent.getSource().getProperty("selectedKey")
                that.getView().getModel("context").setProperty("/UnitOfMeasureLongName", DescriptionValue4);

            },
            onChange6: function (oEvent) {
                var that = this;
                var DescriptionValue5 = oEvent.getSource().getProperty("selectedKey")
                that.getView().getModel("context").setProperty("/DivisionName", DescriptionValue5);

            },
            OnReadPlant: function () {
                debugger
                var that = this;
                oDataModel = this.getOwnerComponent().getModel();
                var oModel = this.getOwnerComponent().getModel("context");

                oDataModel.read("/ZZ1_ValuationArea", {

                    success: function (oData, oResponse) {
                        debugger;
                        var myModel = new JSONModel(oData);
                        myModel.setSizeLimit(10000);
                        that.getView().setModel(myModel, "PlantModel");


                    }
                })
            },
            OnReadMaterialType: function () {
                debugger;
                var that = this;
                var oDataModel1 = this.getOwnerComponent().getModel("MaterialTypeModel");
                var sEntity = "/I_MaterialTypeText";
                var aFilters = [];
                var aMaterialTypeFilters = [
                    new sap.ui.model.Filter("MaterialType", sap.ui.model.FilterOperator.EQ, 'ROH'),
                    new sap.ui.model.Filter("MaterialType", sap.ui.model.FilterOperator.EQ, 'VERP'),
                    new sap.ui.model.Filter("MaterialType", sap.ui.model.FilterOperator.EQ, 'HALB'),
                    new sap.ui.model.Filter("MaterialType", sap.ui.model.FilterOperator.EQ, 'FERT'),
                    new sap.ui.model.Filter("MaterialType", sap.ui.model.FilterOperator.EQ, 'HIBE'),
                    new sap.ui.model.Filter("MaterialType", sap.ui.model.FilterOperator.EQ, 'ERSA')
                ];

                var oCombinedMaterialTypeFilter = new sap.ui.model.Filter({
                    filters: aMaterialTypeFilters,
                    and: false
                });
                var oLanguageFilter = new sap.ui.model.Filter("Language", sap.ui.model.FilterOperator.EQ, 'EN');
                aFilters.push(oLanguageFilter, oCombinedMaterialTypeFilter);
                oDataModel1.read(sEntity, {
                    filters: aFilters,
                    success: function (oData, oResponse) {
                        debugger;
                        var myModel1 = new JSONModel(oData);
                        that.getView().setModel(myModel1, "MaterialTypeModel");
                    },
                    error: function (error) {
                        // Handle error
                    }
                });
            },

            OnReadCompany: function () {
                debugger
                var that = this;
                oDataModel2 = this.getOwnerComponent().getModel("CompanyModel");
                oDataModel2.read("/ZZ1_Company", {
                    success: function (oData, oResponse) {
                        debugger;
                        var myModel2 = new JSONModel(oData);
                        myModel2.setSizeLimit(10000);
                        that.getView().setModel(myModel2, "CompanyTypeModel");
                        that.getView().getModel("CompanyTypeModel").refresh(true);
                    }
                })
            },
            OnReadStorageLocation: function () {
                debugger
                var that = this;
                oDataModel3 = this.getOwnerComponent().getModel("StorageLocation");
                oDataModel3.read("/ZZ1_StorageLocation", {
                    success: function (oData, oResponse) {
                        debugger;
                        var myModel3 = new JSONModel(oData);
                        myModel3.setSizeLimit(10000);
                        that.getView().setModel(myModel3, "StorageLocationModel");

                    }
                })
            },
            OnReadMaterialGroup: function () {
                debugger
                var that = this;
                oDataModel4 = that.getOwnerComponent().getModel("materialtype");
                var aFilters = [];
                var oFilter = new sap.ui.model.Filter("Language", sap.ui.model.FilterOperator.EQ, 'EN');
                aFilters.push(oFilter);
                oDataModel4.read("/I_MaterialGroupText", {
                    filters: aFilters,
                    success: function (oData, oResponse) {
                        debugger;
                        var myModel4 = new JSONModel(oData);
                        myModel4.setSizeLimit(10000);
                        that.getView().setModel(myModel4, "MaterialGroupModel");

                    },
                    error: function (error) {
                        debugger
                    }
                })
            },
            OnReadGentItemGroup: function () {
                debugger
                var that = this;
                oDataModel4 = that.getOwnerComponent().getModel("GenItems");
                var aFilters = [];
                var oFilter = new sap.ui.model.Filter("Language", sap.ui.model.FilterOperator.EQ, 'EN');
                aFilters.push(oFilter);
                oDataModel4.read("/ZZ1_GenItemCatGroup", {
                    filters: aFilters,
                    success: function (oData, oResponse) {
                        debugger;
                        var myModel4 = new JSONModel(oData);
                        myModel4.setSizeLimit(10000);
                        that.getView().setModel(myModel4, "GenModel");

                    },
                    error: function (error) {
                        debugger
                    }
                })
            },
            OnReadBaseUnitOfMeasure: function () {
                debugger
                var that = this;
                oDataModel5 = this.getOwnerComponent().getModel("UnitOfMeasure");
                oDataModel5.read("/ZZ1_UnitOfMeasure", {
                    success: function (oData, oResponse) {
                        debugger;
                        var myModel5 = new JSONModel(oData);
                        myModel5.setSizeLimit(10000);
                        that.getView().setModel(myModel5, "UnitOfMeasureModel");

                    }
                })
            },
            OnReadDivision: function () {
                debugger
                var that = this;
                oDataModel6 = this.getOwnerComponent().getModel("Division");
                oDataModel6.read("/Z_Division", {
                    success: function (oData, oResponse) {
                        debugger;
                        var myModel6 = new JSONModel(oData);
                        that.getView().setModel(myModel6, "DivisionModel");
                    }
                })
            },
            formatDateTime: function (date) {
                debugger

                var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({ pattern: "yyyyMMddHHmmss" });
                var formattedDate = oDateFormat.format(new Date(date));
                return formattedDate;
            },

            OnSubmit: function () {
                debugger
                BusyIndicator.show(0);
                that = this;
                var oThisController = this
                var token;
                var MainProcessId = this.getOwnerComponent().getModel("context").getProperty("/ID");
                var SubProcessId = this.getOwnerComponent().getModel("context").getProperty("/SubProcessID");
                //var NewMAterialNumber=this.getOwnerComponent().getModel("context").getProperty("/LengthData");
                materialNumber = this.getOwnerComponent().getModel("context").getProperty("/NewMaterial");

                var requiredFields = [
                    { id: "company", label: "Company" },
                    { id: "plantInput", label: "Plant" },
                    { id: "Mategrouprial", label: "Material Group" },
                    { id: "basemeasure", label: "Base Unit of Measure" },
                    { id: "division", label: "Division" }

                ];


                function handleFieldChange() {
                    var field = this;
                    if (field.getValue()) {
                        if (field.getValueState() === sap.ui.core.ValueState.Error) {
                            field.setValueState(sap.ui.core.ValueState.None);
                            field.setValueStateText("");
                        }
                    }
                }
                var hasMissingField = false;
                for (var i = 0; i < requiredFields.length; i++) {
                    var fieldInfo = requiredFields[i];
                    var field = oThisController.getView().byId(fieldInfo.id);
                    if (!field.getValue()) {
                        field.setValueState(sap.ui.core.ValueState.Error);
                        field.setValueStateText(fieldInfo.label + " is required");
                        hasMissingField = true;
                    } else {
                        field.setValueState(sap.ui.core.ValueState.None);
                        field.setValueStateText("");
                    }
                    // Attach change event handler to input fields
                    field.attachChange(handleFieldChange);
                }

                var messageStrip = oThisController.getView().byId("messageStrip");

                if (hasMissingField) {
                    messageStrip.setType("Error");
                    messageStrip.setText("Kindly fill all the given required fields.");
                    messageStrip.setVisible(true);
                    return;
                }
                messageStrip.setVisible(false);
                hasMissingField = false;


                console.log("Before get call");
                var aData = jQuery.ajax({
                    type: "GET",
                    contentType: "application/xml",
                    url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/public/spa/commons/v1/xsrf-token",
                    method: "GET",
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (odata, response, data, textStatus, jqXHR) {
                        debugger
                        acs_token = data.getResponseHeader("X-CSRF-Token");
                    },
                    error: function (error) { debugger }

                });
                var company = this.getView().byId("company").getValue();
                var plant = this.getView().byId("plantInput").getValue();
                var MaterialType = this.getView().byId("materialtype").getValue();
                var Mategrouprial = this.getView().byId("Mategrouprial").getValue();
                var base_unit_of_measure = this.getView().byId("basemeasure").getValue();
                var division = this.getView().byId("division").getValue();
                var materialdescription = this.getView().byId("materialdescription").getValue();
                var materiallongdescription = this.getView().byId("textarea").getValue();
                var Category = this.getView().byId("dimension").getValue();
                var genitem = this.getView().byId("gentitem").getValue();
                var materialName = this.getOwnerComponent().getModel("context").getProperty("/MaterialTypeName");
                var CompanyName = this.getOwnerComponent().getModel("context").getProperty("/CompanyCodeName");
                var PlantName = this.getOwnerComponent().getModel("context").getProperty("/PlantName");
                var DivisionName = this.getOwnerComponent().getModel("context").getProperty("/DivisionName");
                var UnitLongName = this.getOwnerComponent().getModel("context").getProperty("/UnitOfMeasureLongName");
                var MateriallGroupText = this.getOwnerComponent().getModel("context").getProperty("/MaterialGroupText");
                var genitemText = this.getOwnerComponent().getModel("context").getProperty("/ItemCategoryGroupName");

                MaterialNumber = oThisController.formatDateTime(new Date());
                var oPayload = {

                    "initiator": {
                        "MATERIAL_TYPE": MaterialType,
                        "PLANT": plant,
                        "COMPANY": company,
                        "MATERIAL_GROUP": Mategrouprial,
                        "MATERIAL_DESCRIPTION": materialdescription,
                        "BASE_UNIT_OF_MEASURE": base_unit_of_measure,
                        "CATEGORY": Category,
                        "DIVISION": division,
                        "MATERIAL_TYPE_NAME": materialName,
                        "PLANT_NAME": PlantName,
                        "COMPANY_NAME": CompanyName,
                        "MATERIAL_GROUP_TEXT": MateriallGroupText,
                        "UOM_LONG_NAME": UnitLongName,
                        "DIVISION_NAME": DivisionName,
                        "GEN_ITEM_CAT_GROUP": genitem,
                        "GEN_ITEM_CAT_GROUP_TEXT": genitemText,
                        "CATEGORY_TEXT": "",
                        "MATERIAL_LONG_DESCRIPTION": materiallongdescription
                    },
                    "procure": {
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
                        "BATCH_MGMT_REQUIRE_INDICATOR": false,
                        "STORAGE_LOCATION_TEXT": "",
                        "STORAGE_BIN_TEXT": "",
                        "TIME_UNIT_TEXT": "",
                        "BATCH_MGMT_REQUIRE_INDICATOR_TEXT": ""
                    },
                    "quality": {
                        "CATLOG_PROFILE": "",
                        "QM_IN_PROC_ACTIVE": false,
                        "HANDLING_UNIT_TYPE": "",
                        "INSPECTION_TYPE_MATERIAL_COMBINATION_IS_ACTIVE": "",
                        "MINIMUM_REMAINING_SHELF_LIFE": "",
                        "TOTAL_SHELF_LIFE": "",
                        "PERIOD_INDICATOR_SLED": "",
                        "MINIMUM_REMAINING_SHELF_LIFE_TEXT": "",
                        "TOTAL_SHELF_LIFE_TEXT": "",
                        "PERIOD_INDICATOR_SLED_TEXT": "",
                        "INSPECTION_SETUP": "",
                        "INSPECTION_TYPE_MATERIAL_COMBINATION_IS_ACTIVE_B": false
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
                    "request_no": MaterialNumber

                };

                var aData1 = jQuery.ajax({
                    type: "POST",
                    contentType: "application/json",
                    async: true,
                    headers: {
                        "X-CSRF-Token": acs_token
                    },
                    // url: oThisController.getOwnerComponent().getManifestObject().resolveUri("/bpmworkflowruntime/public/workflow/rest/v1/workflow-instances"),
                    url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/workflow/rest/v1/workflow-instances",
                    data: JSON.stringify({
                        definitionId: "us10.ibs-portal-dev.materialcreation.materialMasterCreationMainProcess",
                        context: oPayload
                    }),
                    success: function (odata, response, data, textStatus, jqXHR, oEvent) {
                        debugger
                        id = odata.id;
                        console.log("view2" + id);
                        BusyIndicator.hide();
                        MessageBox.success("Material Master Request" + '"' + MaterialNumber + '"' + " has been Initiated", {
                            actions: [MessageBox.Action.OK],
                            emphasizedAction: MessageBox.Action.OK,
                            onClose: function (sAction) {
                                if (sAction === "OK") {

                                    var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                                    oRouter.navTo("route", {
                                        id: id,
                                        materialNumber: MaterialNumber

                                    }, false)

                                    that.getView().byId("company").setValue("");
                                    that.getView().byId("gentitem").setValue("");
                                    that.getView().byId("plantInput").setValue("");
                                    that.getView().byId("materialtype").setValue("");
                                    that.getView().byId("Mategrouprial").setValue("");
                                    that.getView().byId("basemeasure").setValue("");
                                    that.getView().byId("division").setValue("");
                                    that.getView().byId("materialdescription").setValue("");
                                    that.getView().byId("textarea").setValue("");
                                    that.getView().byId("dimension").setValue("");
                                    that.getView().byId("Mdescription").setText("");
                                    that.getView().byId("plantdesc").setText("");
                                    that.getView().byId("companydesc").setText("");
                                    that.getView().byId("grouptextdesc").setText("");
                                    that.getView().byId("unitofmeasuredesc").setText("");
                                    that.getView().byId("divisiondesc").setText("");
                                    that.getView().byId("genttext").setText("");


                                }

                            }
                        });

                    },
                    error: function (error) {
                        BusyIndicator.hide()
                        var errorMessage = "An error occurred.";
                        if (error?.responseJSON?.error?.details?.length > 0) {
                            errorMessage = error.responseJSON.error.details[0].message || errorMessage;
                        }
                        MessageBox.error(errorMessage);

                        that.getView().byId("company").setValue("");
                        that.getView().byId("gentitem").setValue("");
                        that.getView().byId("plantInput").setValue("");
                        that.getView().byId("materialtype").setValue("");
                        that.getView().byId("Mategrouprial").setValue("");
                        that.getView().byId("basemeasure").setValue("");
                        that.getView().byId("division").setValue("");
                        that.getView().byId("materialdescription").setValue("");
                        that.getView().byId("textarea").setValue("");
                        that.getView().byId("dimension").setValue("");
                        that.getView().byId("Mdescription").setText("");
                        that.getView().byId("plantdesc").setText("");
                        that.getView().byId("companydesc").setText("");
                        that.getView().byId("grouptextdesc").setText("");
                        that.getView().byId("unitofmeasuredesc").setText("");
                        that.getView().byId("divisiondesc").setText("");
                        that.getView().byId("genttext").setText("");

                    }
                });
            },

            SubProcessApi: function (oEvent) {
                debugger
                var oThisController = this;
                var id = this.getOwnerComponent().getModel("context").getProperty("/ID");
                var aData = jQuery.ajax({
                    type: "GET",
                    contentType: "application/xml",
                    // url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/public/workflow/rest/v1/workflow-instances?$filter=id eq '" + stratedAt + "'$orderby=startedAt%20desc&$inlinecount=allpages&startedby=darshan.l@intellectbizware.com&definitionId=us10.ibs-portal-dev.materialcreation.sP_MaterialMasterCreationRequest",
                    url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/public/workflow/rest/v1/workflow-instances?$orderby=startedAt%20desc&$top=100&$inlinecount=none&definitionId=us10.ibs-portal-dev.materialcreation.sP_MaterialMasterCreationRequest&rootInstanceId=" + id + "",
                    method: "GET",
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (odata, response, data, textStatus, jqXHR) {
                        debugger
                        SubId = odata[0].id;
                        that.getOwnerComponent().getModel("context").setProperty("/SubProcessID", SubId2);
                        var abc1 = new JSONModel(odata);
                        that.getView().setModel(abc1, "SubProcessData1");

                    },
                    error: function (error) { debugger }

                });

            },
            AllSubProcessApi: function (oEvent) {
                debugger
                var oThisController = this;
                var SubProcessId = this.getOwnerComponent().getModel("context").getProperty("/SubProcessID");
                var aData = jQuery.ajax({
                    type: "GET",
                    contentType: "application/xml",
                    // url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/public/workflow/rest/v1/task-instances?$top=100&$inlinecount=none&$orderby=createdAt%20asc&workflowInstanceId="+ SubId+"",
                    url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/public/workflow/rest/v1/task-instances?$top=1&$inlinecount=none&$orderby=createdAt%20desc&workflowInstanceId=" + SubProcessId + "",
                    method: "GET",
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (odata, response, data, textStatus, jqXHR) {
                        debugger
                        SubId2 = odata[0].id;
                        var StatusShowing = odata[0].status
                        var subject = odata[0].subject
                        var WorkflowID = odata[0].workflowInstanceId
                        that.getOwnerComponent().getModel("context").setProperty("/ShowStatus", StatusShowing);
                        that.getOwnerComponent().getModel("context").setProperty("/SubProcessID2", SubId2);
                        that.getOwnerComponent().getModel("context").setProperty("/WORKFLOW", WorkflowID);
                        var SubProcessFormData1 = new JSONModel(odata);
                        that.getView().setModel(SubProcessFormData1, "SubProcessFormData");
                    },
                    error: function (error) { debugger }
                });

            },
            SubProcessContextApi: function () {
                debugger;

                var oThisController = this;
                var stratedAt = this.getOwnerComponent().getModel("context").getProperty("/ID");
                var SubProcessId2 = this.getOwnerComponent().getModel("context").getProperty("/SubProcessID2");
                var aData = jQuery.ajax({
                    type: "GET",
                    contentType: "application/xml",
                    url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/public/workflow/rest/v1/task-instances/" + SubProcessId2 + "/context",
                    method: "GET",
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (odata, response, data, textStatus, jqXHR) {
                        debugger

                        var SubContextModel1 = new JSONModel(odata);
                        that.getView().setModel(SubContextModel1, "SubProcessContext1");

                    },
                    error: function (error) { debugger }

                });
            },
            OnGetApi: function () {
                debugger;
                var oThisController = this;
                var UserEmail = that.getOwnerComponent().getModel("context").getProperty("/LogInUser");
                var aData = jQuery.ajax({
                    type: "GET",
                    contentType: "application/xml",
                    url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/workflow/rest/v1/workflow-instances?$startedBy=" + UserEmail + "",
                    method: "GET",
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (odata, response, data, textStatus, jqXHR) {
                        debugger

                        var abc = new JSONModel(odata);
                        that.getView().setModel(abc, "apidata");

                    },
                    error: function (error) { debugger }

                });
            },
            OnContextApi: function () {
                debugger;
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
                        debugger

                        var abc1 = new JSONModel(odata);
                        that.getView().setModel(abc1, "contextapidata");
                        //    that.OnIdPress();

                    },
                    error: function (error) { debugger }

                });
            },

            OnCountApi: function () {
                debugger;

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
                        debugger;

                        var abc1 = new JSONModel(odata);
                        that.getView().setModel(abc1, "countapidata");
                    },
                    error: function (error) { debugger }

                });
            },

            OnPatchApi: function (id) {
                debugger
                that = this;
                var oThisController = this;
                var oPayload;


                oPayload = {
                    "request_no": MaterialNumber,

                }
                var aData = jQuery.ajax({
                    type: "PATCH",
                    contentType: "application/json",
                    url: oThisController._getRuntimeBaseURL() + "/bpmworkflowruntime/public/workflow/rest/v1/workflow-instances/" + id + "/context",
                    data: JSON.stringify({
                        definitionId: "us10.ibs-portal-dev.materialcreation.materialMasterCreationMainProcess",
                        context: oPayload
                    }),
                    method: "PATCH",
                    async: false,
                    headers: {
                        "X-CSRF-Token": acs_token
                    },
                    success: function (odata, response, data, textStatus, jqXHR) {
                        debugger;

                        var patchdata = new JSONModel(odata);
                        that.getView().setModel(patchdata, "Patchdata");
                    },
                    error: function (error) {
                        debugger
                    }

                });
            }





        });
    });
