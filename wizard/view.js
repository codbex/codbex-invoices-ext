exports.getAction = function () {
    return {
        id: 'wizard-helper',
        label: 'Wizard',
        perspective: 'purchaseinvoice',
        view: "PurchaseInvoice",
        type: "page",
        link: '/services/web/codbex-invoices-ext/wizard/wizard.html',
        dgViewTitle: "pesho"
    }
}

// const viewData = {
//     id: 'wizard-helper',
//     label: 'Wizard',
//     perspective: 'purchaseinvoice',
//     view: "PurchaseInvoice",
//     type: "page",
//     link: '/services/web/codbex-invoices-ext/wizard/wizard.html'
// };

// if (typeof exports !== 'undefined') {
//     exports.getAction = function () {
//         return viewData;
//     }
// }
