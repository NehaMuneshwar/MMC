sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], 
function (JSONModel, Device) {
    "use strict";

    return {
        /**
         * Provides runtime info for the device the UI5 app is running on as JSONModel
         */
        createDeviceModel: function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },
        ContextModel: function () {
            var mockdata = {
                "sideContentVisible":"",
                "WORKFLOW":"",
                "CompanyCode":"",
                "SubProcessID":"",
                "SubProcessID2":"",
                "REQUESTNO":"",
                "MATERIALTYPE": "",
                "approvalID":"",
                "LevelsName":"",
                "MaterialTypeName":"",
                "PlantName":"",
                "CompanyCodeName":"",
                "MaterialGroupText":"",
                "UnitOfMeasureLongName":"",
                "DivisionName":"",
                "GenItemName":"",
                "ItemCategoryGroupName":"",
                "SubID":"",
                "UnitOfMeasure":"",
                "PLANT": "",
                "ShowStatus":"",
                "Plant":"",
                "SUBJECT":"",
                "Company": "",
               "MATERIALGROUPTEXT": "",
                "UNITOFMEASURE": "",
                "Division": "",
                "Category": "",
                "LengthData":"",
                "LengthData2":"",
                "subjectData":"",
                "MaterialDescription": "",
                "MaterialLongDescription": "",
                "ID":"",
                "Timestamp":"",
                "Status":"",
                "NewMaterial":"",
                "LogInUser":"",
                "CONTROL_CODE": "",
                "PROFIT_CENTER": "",
                "VALUATION_TYPE": "",
                "VALUATION_CATEGORY": "",
                "VALUATION_CLASS": "",
                "PRICE_CONTROL_INDICATOR": false,
                "MOVING_AVG_PRICE_PER_PERIODIC_UNIT_PRICE": "",
                "PRICE_UNIT": "",
                "FUTURE_PRICE": 0,
                "ORIGIN_OF_MATERIAL": "",
                "MATERIAL_COST_WITH_QUANTITY_STRUCTURE": "",
                "MATERIAL_RELATED_ORIGIN": "",
                "FUTURE_PLANNED_PRICE_1": 0,
                "DATE_FROM_FUTURE_PLAN1_VALID": "",
                "FUTURE_PLANNED_PRICE_2": 0,
                "DATE_FROM_FUTURE_PLAN2_VALID": "",
                "DEPARTURE_COUNTRY_GOODS_SENT": "",
                "TAX_CATEGORY_1": "",
                "TAX_CLASSIFICATION_MATERIAL1": "",
                "TAX_CATEGORY_2": "",
                "TAX_CLASSIFICATION_MATERIAL2": "",
                "TAX_CATEGORY_3": "",
                "TAX_CLASSIFICATION_MATERIAL3": "",
                "SALES_ORGANIZATION": "",
                "DISTRIBUTION_CHANNEL": "",
                "SALES_UNIT": "",
                "DELIVERING_PLANT": "",
                "CASH_DISCOUNT_INDICATOR": false,
                "MIN_ORDER_QUANTITY_BUOM": 0,
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
                "DeliveringPlant": "",
                "PurchasingGroup": "",
                "purchasingunitmeasure": "",
                "PurchasengValueKey": "",
                "GoodReceiptProcessingTime": "",
                "LengthData": "",
                "CATLOG_PROFILE": "",
                "QM_IN_PROC_ACTIVE": false,
                "HANDLING_UNIT_TYPE": "",
                "INSPECTION_TYPE_MATERIAL_COMBINATION_IS_ACTIVE": "",
                "MINIMUM_REMAINING_SHELF_LIFE": "",
                "TOTAL_SHELF_LIFE": "",
                "PERIOD_INDICATOR_SLED": "",
                "LEVEL_1": "",
                "LEVEL_2": "",
                "LEVEL_3": "",
                "LEVEL_4": "",
                "LEVEL_5": "",
                "MAX_LEVEL": 0,
                "LEVEL_NAME": "",
                "LEVEL_COUNT": 0,
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
                "ASSEMBLY_SCRAP_PERCENTAGE": 0,
                "ROUNDING_PROFILE": "",
                "PROCUREMENT_TYPE": "",
                "SPECIAL_PROCUREMENT_TYPE": "",
                "INDICATOR_BACKFLUSH": "",
                "STORAGE_LOCATION_FOR_EXTERNAL_PROC": "",
                "EditableMain": true,
                "EditableTemp": false,
               "COMPANYCODENAME":"",
               "COMPANYNAME":"",
               "plantfield":false


            }
            var myModel = new JSONModel(mockdata);
            myModel.setDefaultBindingMode("TwoWay");
            return myModel;
        }

    };

});