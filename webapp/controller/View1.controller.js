sap.ui.define([
  "sap/ui/core/mvc/Controller",
  'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
  "sap/ui/model/json/JSONModel"

], function (Controller, Filter, FilterOperator, JSONModel) {
  "use strict";

  return Controller.extend("geonosis.project1.controller.View1", {

    onInit: function () {
      // this.getOwnerComponent().setModel(new JSONModel(), "oModelFilters");
    },

	onBeforeRendering: function(){
		console.error("A problem ocurred!");
	},

	onAfterRendering: function(){
		debugger;
	},

    onListItemPress: function (oEvent) {
      sap.ui.core.BusyIndicator.show();
      this.getOwnerComponent().getModel("layoutMod").setProperty("/layout", "TwoColumnsMidExpanded");
      const sId = oEvent.getSource().getBindingContext("data").getProperty("id");
      this.getOwnerComponent().getRouter().navTo("detail", { id: sId });

    },

    onSearch: function(oEvent){
		let aFilters = [];
		const oTable = this.byId("tblProducts");
		const oBinding = oTable.getBinding("items");
		const oFilterBar = oEvent.getSource();
		
		const aTableFilters = oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
				const oControl = oFilterGroupItem.getControl();
				const sSelectedValue = oControl.getValue();

				aResult.push(new Filter({
						path: oFilterGroupItem.getName(),
						operator: FilterOperator.Contains,
						value1: sSelectedValue
					})
				);
				return aResult;
			}, []
		);

		aFilters.push(new Filter({
			filters: aTableFilters,
			and: true
			})
		);

      	oBinding.filter(aFilters);
    }
}); 
});