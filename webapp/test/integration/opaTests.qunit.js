/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["geonosis/project1/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
