exports.getDialogWindow = function () {
    return {
        id: 'wizard-helper',
        label: 'Wizard',
        perspective: 'purchaseinvoice',
        view: "PurchaseInvoice",
        type: "entity",
        link: '/services/web/codbex-invoice-ext/wizard/index.html'
    }
}