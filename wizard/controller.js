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

    $http.get("/services/ts/codbex-partners/gen/api/Suppliers/SupplierService.ts").then((response) => {
        $scope.optionsSupplier = response.data.map(function (supplier) {
            return { value: supplier.Name, text: supplier.Name };
        })
    })

    $scope.onComboboxChange = function () {
        console.log("Selected Supplier:", $scope.entity.Supplier);
        debugger
        $scope.$valid = true
    };

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