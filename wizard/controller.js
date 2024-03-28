let widgetsView = angular.module('widgets', ['ideUI', 'ideView']);

widgetsView.config(["messageHubProvider", function (messageHubProvider) {
    messageHubProvider.eventIdPrefix = 'template';
}]);
// }
// $scope.dijest()
// $scope.apply() **

// Initialize controller
widgetsView.controller('WidgetsViewController', ['$scope', 'messageHub', '$http', function ($scope, messageHub, $http) {

    $scope.entity = {
        Supplier: null
    };

    $scope.optionsSupplier = [];
    $scope.optionsCurrency = [];
    $scope.optionsPaymentMethod = [];
    $scope.optionsSentMethod = [];
    $scope.optionsPurchaseinvoiceStatus = [];
    $scope.optionsOperator = [];
    $scope.optionsProduct = [];
    $scope.optionsUoM = [];

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
            return { value: product.Id, text: product.Name };
        })
    })

    $http.get("/services/ts/codbex-uoms/gen/api/UnitsOfMeasures/UoMService.ts").then((response) => {
        $scope.optionsUoM = response.data.map(function (UoM) {
            return { value: UoM.Id, text: UoM.Name };
        })
    })

    $scope.steps = [
        { id: 1, name: "Create a Purchase Invoice", topicId: "template.widgets.screeen.one" }
    ];
    $scope.currentStep = $scope.steps[0];
    $scope.records = [];

    $scope.wizard = {
        currentStep: 1,
        completedSteps: 0,
        stepsCount: 1
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

    $scope.createNewRecordPage = function () {
        $scope.records.push({ stepCount: $scope.records.length + 1 });
        $scope.steps.push({ id: $scope.steps.length, name: "Create a Purchase Invoice Item", topicId: `template.widgets.screeen.${$scope.steps.length}` });
        $scope.wizard.stepsCount++;

        // Set the current step to the newly added step
        $scope.gotoNextStep();
        console.log($scope.wizard);
    };
}]);


widgetsView.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});