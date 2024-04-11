const viewData = {
    id: 'wizard-helper',
    label: 'Wizard',
    perspective: 'purchaseinvoice',
    view: 'PurchaseInvoice',
    type: 'page',
    link: '/services/web/codbex-invoices-ext/wizard/wizard.html'
};

if (typeof exports !== 'undefined') {
    exports.getDialogWindow = function () {
        return viewData;
    }
}
