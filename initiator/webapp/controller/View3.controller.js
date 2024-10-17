sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel"
    ],
    function(Controller,JSONModel) {
      "use strict";
  
      return Controller.extend("com.ibs.materialcreate.initiator.controller.View3", {
        onInit: function() {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.getRoute("route3").attachPatternMatched(this.onRouteMatched, this)
        },
        onRouteMatched: function () {
          var oRouter = UIComponent.getRouterFor(this);
          oRouter.navTo("route", false);

      },
      });
    }
  );
  