sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/routing/History"
], function(Controller, History) {
  "use strict";
  return Controller.extend("geonosis.project1.controller.Detail", {

    onInit: function () {

      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("detail").attachPatternMatched(this._onMatched, this);
    },


    _onMatched: function (oEvent) {

    
        const sId = oEvent.getParameter("arguments").id;
        const oModel = this.getOwnerComponent().getModel("data");
        const aItems = oModel.getProperty("/items");

        // Buscar el índice del elemento con ese ID
        const iIndex = aItems.findIndex(item => item.id === sId);

        if (iIndex !== -1) {
            const sPath = `/items/${iIndex}`;
            this.getView().bindElement({ path: sPath, model: "data" });
        } else {
            console.error("ID no encontrado:", sId);
        }

        sap.ui.core.BusyIndicator.hide();

    },

    onNavBack: function () {
      const sPrev = History.getInstance().getPreviousHash();
      if (sPrev !== undefined) {
        window.history.go(-1);
      } else {
        this.getOwnerComponent().getModel("layoutMod").setProperty("/layout", "OneColumn");
        this.getOwnerComponent().getRouter().navTo("begin", {}, true);
      }
    },

    onCloseDetail: function() {
      this.getOwnerComponent().getModel("layoutMod").setProperty("/layout", "OneColumn");
      this.getOwnerComponent().getRouter().navTo("begin", {}, true);
    }

  });
});