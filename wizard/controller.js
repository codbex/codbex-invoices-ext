let widgetsView = angular.module('widgets', ['ideUI', 'ideView', "entityApi"]);

widgetsView.config(["messageHubProvider", function (messageHubProvider) {
    messageHubProvider.eventIdPrefix = 'template';
}]);

widgetsView.config(["entityApiProvider", function (entityApiProvider) {
    entityApiProvider.baseUrl = "/services/ts/codbex-invoices/gen/api/purchaseinvoice/PurchaseInvoiceService.ts";
}])

widgetsView.controller('WidgetsViewController', ['$scope', '$http', 'messageHub', 'entityApi', function ($scope, $http, messageHub, entityApi) {

    $scope.entity = {
        Date: null,
        Due: null,
        Supplier: null,
        Currency: null,
        PaymentMethod: null,
        SentMethod: null,
        PurchaseinvoiceStatus: null,
        Operator: null,

        Product: null,
        Quantity: null,
        UoM: null,
        Price: null
    };

    $scope.forms = {
        purchaseinvoice: {},
        item: {}
    };

    $scope.optionsSupplier = [];
    $scope.optionsCurrency = [];
    $scope.optionsPaymentMethod = [];
    $scope.optionsSentMethod = [];
    $scope.optionsPurchaseinvoiceStatus = [];
    $scope.optionsOperator = [];
    $scope.optionsProduct = [];
    $scope.optionsUoM = [];

    $scope.steps = [
        { id: 1, name: "Create a Purchase Invoice", topicId: "template.widgets.screeen.one" },
        { id: 2, name: "Create  Items", topicId: "template.widgets.screeen.two" }
    ];
    $scope.currentStep = $scope.steps[0];

    $scope.wizard = {
        currentStep: 1,
        completedSteps: 0,
        stepsCount: 2
    };

    //* if null the edit mode is NOT active
    //* else the edit index is saved in it
    $scope.editModeIndex = null;
    $scope.items = []


    $http.get("/services/ts/codbex-partners/gen/api/Suppliers/SupplierService.ts").then((response) => {
        $scope.optionsSupplier = response.data.map(function (supplier) {
            return { value: supplier.Id, text: supplier.Name };
        })
    })

    $http.get("/services/ts/codbex-currencies/gen/api/Currencies/CurrencyService.ts").then((response) => {
        $scope.optionsCurrency = response.data.map(function (currency) {
            return { value: currency.Id, text: currency.Name };
        })
    })

    $http.get("/services/ts/codbex-methods/gen/api/Methods/PaymentMethodService.ts").then((response) => {
        $scope.optionsPaymentMethod = response.data.map(function (paymentMethod) {
            return { value: paymentMethod.Id, text: paymentMethod.Name };
        })
    })

    $http.get("/services/ts/codbex-methods/gen/api/Methods/SentMethodService.ts").then((response) => {
        $scope.optionsSentMethod = response.data.map(function (sentMethod) {
            return { value: sentMethod.Id, text: sentMethod.Name };
        })
    })

    $http.get("/services/ts/codbex-invoices/gen/api/settings/PurchaseInvoiceStatusService.ts").then((response) => {
        $scope.optionsPurchaseinvoiceStatus = response.data.map(function (purchaseinvoiceStatus) {
            return { value: purchaseinvoiceStatus.Id, text: purchaseinvoiceStatus.Name };
        })
    })

    $http.get("/services/ts/codbex-employees/gen/api/Employees/EmployeeService.ts").then((response) => {
        $scope.optionsOperator = response.data.map(function (operator) {
            return { value: operator.Id, text: operator.FirstName };
        })
    })

    $http.get("/services/ts/codbex-products/gen/api/Products/ProductService.ts").then((response) => {
        $scope.optionsProduct = response.data.map(function (product) {
            console.log(product.Id)
            return { value: product.Id, text: product.Name };
        })
    })

    $http.get("/services/ts/codbex-uoms/gen/api/UnitsOfMeasures/UoMService.ts").then((response) => {
        $scope.optionsUoM = response.data.map(function (UoM) {
            return { value: UoM.Id, text: UoM.Name };
        })
    })

    $scope.isEditMode = function () {
        return $scope.editModeIndex !== null;
    }

    $scope.clearItemForm = function () {
        $scope.entity.Product = null;
        $scope.entity.Quantity = null;
        $scope.entity.UoM = null;
        $scope.entity.Price = null;
    }

    $scope.getItemFromForm = function () {
        const { Product, Quantity, UoM, Price } = $scope.entity;
        return { Product, Quantity, UoM, Price };
    }

    $scope.editItemInForm = function (index) {
        let item = $scope.items[index]

        angular.extend($scope.entity, item);

        // $scope.entity.Product = item.Product;
        // $scope.entity.Quantity = item.Quantity;
        // $scope.entity.UoM = item.UoM;
        // $scope.entity.Price = item.Price;

        $scope.editModeIndex = index;
    }

    $scope.editSubmit = function () {
        let item = $scope.getItemFromForm()
        $scope.items[$scope.editModeIndex] = item;

        $scope.editModeIndex = null;

        $scope.clearItemForm();
    }

    $scope.addSubmit = function () {
        let item = $scope.getItemFromForm();
        $scope.items.push(item);
        $scope.clearItemForm();
    }

    $scope.isFormValid = function () {
        switch ($scope.wizard.currentStep) {
            case 1:
                if ($scope.forms.purchaseinvoice) {
                    return $scope.forms.purchaseinvoice.$valid === true ||
                        $scope.forms.purchaseinvoice.$valid === undefined
                }
                return false;
            case 2:
                if ($scope.forms.item) {
                    return $scope.forms.item.$valid === true ||
                        $scope.forms.item.$valid === undefined
                }
                return false;
        }
    };

    $scope.revert = function (completedStepsCount) {
        $scope.wizard.completedSteps = completedStepsCount;
    };

    $scope.gotoNextStep = function () {
        if ($scope.wizard.currentStep > $scope.wizard.completedSteps) {
            $scope.wizard.completedSteps = $scope.wizard.currentStep;
        }

        if ($scope.wizard.currentStep <= $scope.wizard.stepsCount) {
            $scope.gotoStep($scope.wizard.currentStep + 1);
        }
    };

    $scope.gotoPreviousStep = function () {
        if ($scope.wizard.currentStep > 1) {
            $scope.gotoStep($scope.wizard.currentStep - 1);
        }
    };

    $scope.gotoStep = function (step) {
        $scope.wizard.currentStep = step;
    };

    $scope.getIndicatorGlyph = function (step) {
        return step <= $scope.wizard.completedSteps ? 'sap-icon--accept' : step;
    };

    $scope.isLastStep = function () {
        return $scope.wizard.currentStep === $scope.wizard.stepsCount;
    };

    $scope.isFirstStep = function () {
        return $scope.wizard.currentStep <= 1;
    };

    $scope.allStepsCompleted = function () {
        return $scope.wizard.completedSteps >= $scope.wizard.stepsCount;
    };

    $scope.combobox = {
        selectedModelValue: null,
        selectedModelValues: [],
        onCBChange: function () {
            console.log($scope.combobox.selectedModelValue);
        },
        onMCBChange: function () {
            console.log($scope.combobox.selectedModelValues);
        }
    };

    //-----------------Events-------------------//

    $scope.finish = function () {
        //-----Create PurchaseInvoice----//
        entityApi.create({
            Date: $scope.entity.Date,
            Due: $scope.entity.Due,
            Supplier: $scope.entity.Supplier,
            Currency: $scope.entity.Currency,
            PaymentMethod: $scope.entity.PaymentMethod,
            SentMethod: $scope.entity.SentMethod,
            PurchaseInvoiceStatus: $scope.entity.PurchaseinvoiceStatus,
            Operator: $scope.entity.Operator
        }).then(function (response) {
            if (response.status != 201) {
                messageHub.showAlertError("PurchaseInvoice", `Unable to create PurchaseInvoice: '${response.message}'`);
                return;
            }


            messageHub.postMessage("entityCreated", response.data);
            messageHub.postMessage("clearDetails", response.data);
            messageHub.showAlertSuccess("PurchaseInvoice", "PurchaseInvoice successfully created");
        });
    };
}]);


widgetsView.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});