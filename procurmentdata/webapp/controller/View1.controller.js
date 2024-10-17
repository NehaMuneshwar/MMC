sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Label",
    "sap/m/Input",
    "sap/ui/layout/form/SimpleForm",
    "sap/uxap/ObjectPageSection",
    "sap/uxap/ObjectPageSubSection",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (Controller, Label, Input, SimpleForm, ObjectPageSection, ObjectPageSubSection, Fragment, JSONModel, MessageBox) {
    "use strict";
    var that = null;
    var sLevelName = "";
    var oDataModel1;
    var SectionCount = 1;
    return Controller.extend("com.ibs.materialcreate.procurmentdata.controller.View1", {
        onInit: function () {
            
            that = this;
            var jsonData = {
                "definitionId": "us10.ibs-portal-dev.materialmastercreation1.materialMasterCreationMainProcess",
                "context": {
                    "initiator": {
                        "MATERIAL_TYPE": "ROH",
                        "PLANT": "",
                        "COMPANY": "",
                        "MATERIAL_GROUP": "",
                        "MATERIAL_DESCRIPTION": "",
                        "BASE_UNIT_OF_MEASURE": "",
                        "CATEGORY": "",
                        "DIVISION": "",
                        "GEN_ATEM_CAT_GROUP": ""
                    },
                    
                    "salesmarketing": {
                        "SALES_ORGANIZATION": "",
                        "DISTRIBUTION_CHANNEL": "",
                        "SALES_UNIT": "",
                        "DELIVERING_PLANT": ""
                    },
                    "productionplant": {
                        "MRP_GROUP": "",
                        "ABC_INDICATOR": "",
                        "MRP_TYPE": "",
                        "REORDER_TYPE": ""
                    },

                    "quality": {
                        "MINIMUM_REMAINING_SHELF_LIFE": "",
                        "TOTAL_SHELF_LIFE": "",
                        "PERIOD_INDICATOR_SLED": ""
                    },
                    "finance": {
                        "CONTROL_CODE": "001",
                        "PROFIT_CENTER": "003",
                        "VALUATION_TYPE": "CC",
                        "VALUATION_CATEGORY": "CC"
                    },
                    "procurement": {
                        "PURCHASING_GROUP": "",
                        "PO_UNIT_OF_MEASURE": "",
                        "PURCHASING_VALUE_KEY": "",
                        "GOOD_RECIEPT_PROCESSING_TIME": "",
                        "AUTOMATIC_PO_ALLOWED": false
                    },
                    "levels": {
                        "LEVEL_1": "salesmarketing",
                        "LEVEL_2": "finance",
                        "LEVEL_3": "productionplant",
                        "LEVEL_4": "quality",
                        "LEVEL_5": "",
                        "MAX_LEVEL": 5,
                        "LEVEL_NAME": "quality",
                        "LEVEL_COUNT": 0
                    }
                }
            };

            var oModel = new JSONModel(jsonData);
            this.getView().setModel(oModel, "levelsModel");
            //this.createContent(jsonData);
            // this.getlevels(jsonData);
        },


        //     var level1 = {
        //         "controlcode": "",
        //         "Profitcenter": "",
        //         "ValuationType": "",
        //         "ValuationCategory":"",
        //         "EditableMain": true,
        //         "EditableTemp": false,
        //         "VisibleMainlevel1":true,
        //         "VisibleMainlevel2":true,
        //         "VisibleMainlevel3":true,
        //         "VisibleMainlevel4":true,
        //         "VisibleMainlevel5":true,
        //         "VisibleTemplevel1":false,
        //         "VisibleTemplevel2":false,
        //         "VisibleTemplevel3":false,
        //         "VisibleTemplevel4":false,
        //         "VisibleTemplevel5":false
        //       }
        //     var myModel1 = new JSONModel(level1);
        //     that.getView().setModel(myModel1, "contextModel1")

        //     var level2 = {
        //         "PurchasingGroup": "",
        //         "purchasingunitmeasure": "",
        //         "PurchasengValueKey": "",
        //         "GoodReceiptProcessingTime": "",
        //         "EditableMain": true,
        //         "EditableTemp": false,

        //     }
        //     var myModel1 = new JSONModel(level2);
        //     that.getView().setModel(myModel1, "contextModel2")

        //     this.OnReadMaterialType();

        // },
        // OnLevel1: function () {
        //     ;
        //     
        //     var oView = this.getView().getModel("contextModel1");
        //     var a = oView.getProperty("/SalesOrganization");
        //     var b = oView.getProperty("/DistributionChannel");
        //     var c = oView.getProperty("/DeliveringPlant");
        //     if (a && b && c) {
        //         this.getView().getModel("contextModel1").setProperty("/EditableMain", false);

        //     }

        // },

        // OnLevel2: function () {
        //     ;
        //     var oView1 = this.getView().getModel("contextModel");
        //     var controlcode = oView1.getProperty("/controlcode");
        //     var profit = oView1.getProperty("/Profitcenter");
        //     var valuation = oView1.getProperty("/ValuationType");
        //     var valuationCategory = oView1.getProperty("/ValuationCategory");
        //     if (controlcode && profit && valuation && valuationCategory) {
        //         this.getView().getModel("contextModel").setProperty("/EditableMain", false);
        //     }

        // },
        // OnLevel3: function () {
        //     debugger;
        //     var oView1 = this.getView().getModel("contextModel2");
        //     var controlcode = oView1.getProperty("/PurchasingGroup");
        //     var profit = oView1.getProperty("/purchasingunitmeasure");
        //     var valuation = oView1.getProperty("/PurchasengValueKey");
        //     var valuationCategory = oView1.getProperty("/GoodReceiptProcessingTime");
        //     if (controlcode && profit && valuation && valuationCategory) {
        //         this.getView().getModel("contextModel2").setProperty("/EditableMain", false);
        //     }

        // },
        OnReadMaterialType: function () {
            
            var that = this;
            var sEntity = "/I_MaterialTypeText";
            oDataModel1 = this.getOwnerComponent().getModel("materialtype");
            oDataModel1.read(sEntity, {
                success: function (oData, oResponse) {
                    
                    var myModel1 = new JSONModel(oData);
                    that.getView().setModel(myModel1, "MaterialTypeModel")

                },
                error: function (error) {
                    
                }
            })

        },

        _getLevelFromName: function (inputName, levelMappingObj) {

            for (var sKey in levelMappingObj) {
                if (levelMappingObj.hasOwnProperty(sKey)) {
                    var value = levelMappingObj[sKey];
                    if (value === inputName) {
                        return value;
                    }
                }
            }
        },

        // createContent: function (jobj) {
            
        //     var sBaseFragmentFilePath = "com.ibs.materialcreate.procurmentdata.view.Fragment.";
        //     var oObjectPageLayout = this.byId("objectPageLayout");
        //     var obj = jobj.context;
        //     var sFragName = "";

        //     var count = 1
        //     var condition;
        //     for (var key in obj) {
        //         if (obj.hasOwnProperty(key)) {

        //             var value = obj[key];

        //             if (typeof value === 'object' && key !== 'levels' && key !== 'initiator') {

        //                 sLevelName = that._getLevelFromName(key, obj['levels']);
        //                 // Create a SubSection
        //                 var oSubSection = new ObjectPageSubSection();
        //                 var sFragPath = sBaseFragmentFilePath + sLevelName;
        //                 this._loadFragment(sFragPath, oSubSection);

        //                 // Create a Section
        //                 if (count == 1) {
        //                     condition = true
        //                 } else {
        //                     condition = false
        //                 }
        //                 var oSection = new ObjectPageSection({
        //                     title: key,
        //                     subSections: [oSubSection],
        //                     visible: condition,
        //                     id: 'idobjsubsection-' + count + ''

        //                 });

        //                 ++count
        //                 // Add the Section to the ObjectPageLayout
        //                 oObjectPageLayout.addSection(oSection);

        //             }
        //         }
        //     }
        // },

        // getlevels: function (jobj) {
        //     var obj = jobj.context;
        //     var levels = obj['levels'];
        //     var level1 = levels.LEVEL_1,
        //         level2 = levels.LEVEL_2,
        //         level3 = levels.LEVEL_3,
        //         level4 = levels.LEVEL_4,
        //         level5 = levels.LEVEL_5,
        //         levelName = levels.LEVEL_NAME;
        //     var sBaseFragmentFilePath = "com.ibs.materialcreate.procurmentdata.view.Fragment.";
        //     var oObjectPageLayout = this.byId("objectPageLayout");
        //     var sFragName = "";
        //     var levelArray = [level1, level2, level3, level4, level5];
        //     for (var i = 0; i < levelArray.length; i++) {

        //         if (levelArray[i] === levelName) {
        //             var oSubSection = new ObjectPageSubSection();
        //                 var sFragPath = sBaseFragmentFilePath + levelArray[i];
        //                 this.getView().getModel("levelsModel").setProperty("/" + levelArray[i] + "", true);
        //                 this._loadFragment(sFragPath, oSubSection);

        //                 var oSection = new ObjectPageSection({
        //                     title: levelArray[i],
        //                     subSections: [oSubSection],
        //                     visible: true,
        //                     id: 'idobjsubsection-' + i + ''

        //                 });
        //                 oObjectPageLayout.addSection(oSection);
                        
        //             return;

        //         }else{
        //             var oSubSection = new ObjectPageSubSection();
        //                 var sFragPath = sBaseFragmentFilePath + levelArray[i];
        //                 this.getView().getModel("levelsModel").setProperty("/" + levelArray[i] + "", false);
        //                 this._loadFragment(sFragPath, oSubSection);

        //                 var oSection = new ObjectPageSection({
        //                     title: levelArray[i],
        //                     subSections: [oSubSection],
        //                     visible: true,
        //                     id: 'idobjsubsection-' + i + ''

        //                 });
        //                 oObjectPageLayout.addSection(oSection);
                        
        //         }
        //     }

        // },

        // _loadFragment: function (sFragmentPath, oObjectPageSubSection) {
            
        //     var oView = this.getView();

        //     Fragment.load({
        //         id: oView.getId(),
        //         name: sFragmentPath,
        //         controller: this
        //     }).then(function (oFragment) {
        //         oObjectPageSubSection.addBlock(oFragment);
        //     }).catch(function (oError) {
        //         // Handle errors here
        //         console.error("Error loading fragment: ", oError);
        //     });
        // },

        FinanceChange: function () {
            
            var oView = this.getView().getModel("contextModel");
            var a = oView.getProperty("/controlcode");
            var b = oView.getProperty("/Profitcenter");
            var c = oView.getProperty("/ValuationType");
            var d = oView.getProperty("/ValuationCategory");
            if (a && b && c && d) {
                this.getView().getModel("contextModel").setProperty("/EditableFinance", false);
                SectionCount++;
                sap.ui.getCore().byId("idobjsubsection-" + SectionCount + "").setVisible(true)

            }
        },
        procurementChange: function () {
            
            var oView = this.getView().getModel("contextModel");
            var e = oView.getProperty("/PurchasingGroup");
            var f = oView.getProperty("/purchasingunitmeasure");
            var g = oView.getProperty("/PurchasengValueKey");
            var h = oView.getProperty("/GoodReceiptProcessingTime");
            if (e && f && g && h) {
                this.getView().getModel("contextModel").setProperty("/Editableprocurment" + SectionCount + "", false);
                SectionCount++;
                sap.ui.getCore().byId("idobjsubsection-" + SectionCount + "").setVisible(true)
            }
        },
        OnProdution: function () {

            var temp1 = this.getView().getModel("levelsModel").getProperty("/context/productionplant/MRP_GROUP");
            var temp2 = this.getView().getModel("levelsModel").getProperty("/context/productionplant/ABC_INDICATOR");

            if (temp1 && temp2) {
                
                this.getView().byId("submitID").setEnabled(true);

            }
        },
        onSalesMarketingFieldChange: function () {
            
            var oView = this.getView().getModel("contextModel");
            var l = oView.getProperty("/SalesOrganization");
            var m = oView.getProperty("/DistributionChannel");
            var n = oView.getProperty("/DeliveringPlant");

            if (l && m && n) {
                this.getView().getModel("contextModel").setProperty("/EditableSales" + SectionCount + "", false);
                SectionCount++;
                sap.ui.getCore().byId("idobjsubsection-" + SectionCount + "").setVisible(true)

            }
        }
    });
});
