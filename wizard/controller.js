let widgetsView = angular.module('widgets', ['ideUI', 'ideView']);

widgetsView.config(["messageHubProvider", function (messageHubProvider) {
    messageHubProvider.eventIdPrefix = 'template';
}]);

// widgetsView.config(["entityApiProvider", function (entityApiProvider) {
//     entityApiProvider.baseUrl = "/services/ts/codbex-invoices/gen/api/purchaseinvoice/PurchaseInvoiceService.ts";
// }])

widgetsView.directive('dynamicWizardStep', function ($compile) {
    return {
        restrict: 'E',
        scope: {},
        template: `
            <fd-wizard-step fd-scrollbar dg-size="md" ng-attr-dg-label="{{ 'Step ' + stepCount + ': Create a record' }}" ng-attr-indicator-label="{{ stepCount }}"
                ng-attr-indicator-glyph="{{ getIndicatorGlyph(stepCount) }}" step-click="gotoStep(stepCount)">
                <div id="create-component">
                     <fd-form-item horizontal="false">
                        <fd-form-label for="idProduct" dg-required="true" dg-colon="true">Product
                        </fd-form-label>
                        <fd-combobox-input id="idProduct" name="Product"
                            state="{{ forms.details['Product'].$valid ? '' : 'error' }}" ng-required="true"
                            ng-model="entity.Product" dg-disabled="action === 'select'"
                            dropdown-items="optionsProduct" dg-placeholder="Search Product ...">
                        </fd-combobox-input>
                    </fd-form-item>
                    <fd-form-item horizontal="false">
                        <fd-form-label for="idQuantity" dg-required="true" dg-colon="true">Quantity
                        </fd-form-label>
                        <fd-step-input dg-id="iis1" name="iisQuantity" ng-model="stepInputValue" dg-min="0" dg-max="10"
								dg-step="1" state="error">
                    </fd-form-item>
                    <fd-form-item horizontal="false">
                        <fd-form-label for="idUoM" dg-required="true" dg-colon="true">UoM
                        </fd-form-label>
                        <fd-combobox-input id="idUoM" name="UoM"
                            state="{{ forms.details['UoM'].$valid ? '' : 'error' }}" ng-required="true"
                            ng-model="entity.UoM" dg-disabled="action === 'select'"
                            dropdown-items="optionsUoM" dg-placeholder="Search UoM ...">
                        </fd-combobox-input>
                    </fd-form-item>
                    <fd-form-item horizontal="false">
                        <fd-form-label for="idPrice" dg-required="true" dg-colon="true">Price
                        </fd-form-label>
                        <fd-step-input dg-id="iis2" name="iisPrice" ng-model="stepInputValue" dg-min="0" dg-max="10000"
								dg-step="1" state="error">
                    </fd-form-item>
                </div>
            </fd-wizard-step>
        `,
        link: function (scope, element, attrs) {
            scope.stepCount = attrs.stepCount || '*';

            scope.addStep = function () {
                // Compile the dynamic template
                var compiledHtml = $compile(scope.template)(scope);

                // Append the compiled HTML to the directive element
                element.append(compiledHtml);
            };

            // Call addStep initially to compile the template
            scope.addStep();
        }
    };
});

// {
//     value: ,
//     text: ""
// }
// $scope.dijest()
// $scope.apply() **

// Initialize controller
widgetsView.controller('WidgetsViewController', ['$scope', 'messageHub', '$http', function ($scope, messageHub, $http) {

    messageHub.onDidReceiveMessage("clearDetails", function (msg) {
        $scope.$apply(function () {
            $scope.entity = {};
            $scope.optionsSupplier = [];
            $scope.optionsCurrency = [];
            $scope.optionsPaymentMethod = [];
            $scope.optionsSentMethod = [];
            $scope.optionsPurchaseInvoiceStatus = [];
            $scope.optionsOperator = [];
            $scope.optionsCompany = [];
            $scope.action = 'select';
        });
    });

    messageHub.onDidReceiveMessage("entitySelected", function (msg) {
        $scope.$apply(function () {
            if (msg.data.entity.Date) {
                msg.data.entity.Date = new Date(msg.data.entity.Date);
            }
            if (msg.data.entity.Due) {
                msg.data.entity.Due = new Date(msg.data.entity.Due);
            }
            $scope.entity = msg.data.entity;
            $scope.optionsSupplier = msg.data.optionsSupplier;
            $scope.optionsCurrency = msg.data.optionsCurrency;
            $scope.optionsPaymentMethod = msg.data.optionsPaymentMethod;
            $scope.optionsSentMethod = msg.data.optionsSentMethod;
            $scope.optionsPurchaseInvoiceStatus = msg.data.optionsPurchaseInvoiceStatus;
            $scope.optionsOperator = msg.data.optionsOperator;
            $scope.optionsCompany = msg.data.optionsCompany;
            $scope.action = 'select';
        });
    });

    messageHub.onDidReceiveMessage("createEntity", function (msg) {
        $scope.$apply(function () {
            $scope.entity = {};
            $scope.optionsSupplier = msg.data.optionsSupplier;
            $scope.optionsCurrency = msg.data.optionsCurrency;
            $scope.optionsPaymentMethod = msg.data.optionsPaymentMethod;
            $scope.optionsSentMethod = msg.data.optionsSentMethod;
            $scope.optionsPurchaseInvoiceStatus = msg.data.optionsPurchaseInvoiceStatus;
            $scope.optionsOperator = msg.data.optionsOperator;
            $scope.optionsCompany = msg.data.optionsCompany;
            $scope.action = 'create';
        });
    });

    messageHub.onDidReceiveMessage("updateEntity", function (msg) {
        $scope.$apply(function () {
            if (msg.data.entity.Date) {
                msg.data.entity.Date = new Date(msg.data.entity.Date);
            }
            if (msg.data.entity.Due) {
                msg.data.entity.Due = new Date(msg.data.entity.Due);
            }
            $scope.entity = msg.data.entity;
            $scope.optionsSupplier = msg.data.optionsSupplier;
            $scope.optionsCurrency = msg.data.optionsCurrency;
            $scope.optionsPaymentMethod = msg.data.optionsPaymentMethod;
            $scope.optionsSentMethod = msg.data.optionsSentMethod;
            $scope.optionsPurchaseInvoiceStatus = msg.data.optionsPurchaseInvoiceStatus;
            $scope.optionsOperator = msg.data.optionsOperator;
            $scope.optionsCompany = msg.data.optionsCompany;
            $scope.action = 'update';
        });
    });

    $scope.steps = [
        { id: 1, name: "Create a Purchase Invoice", topicId: "template.widgets.screeen.one" }
    ];
    $scope.currentStep = $scope.steps[0];

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
        let wizardContent = document.querySelector(".wizard-content");
        if (wizardContent) {
            // Increment the steps count
            $scope.wizard.stepsCount += 1;

            // Create a new step object
            const newStep = {
                id: $scope.wizard.stepsCount,
                name: "Create a record",
                topicId: `template.widgets.screeen.${$scope.wizard.stepsCount}`
            };

            // Add the new step to the steps array
            $scope.steps.push(newStep);

            // Create a new dynamic wizard step element
            let dynamicWizardStep = angular.element('<dynamic-wizard-step step-count="wizard.stepsCount"></dynamic-wizard-step>');

            // Compile the dynamic wizard step element with the current scope
            let compiledDynamicWizardStep = $compile(dynamicWizardStep)($scope);

            // Append the compiled element to the wizard content
            angular.element(wizardContent).append(compiledDynamicWizardStep);

            // Set the current step to the newly added step
            $scope.gotoNextStep();
            console.log($scope.wizard);
        }
    };
}]);


widgetsView.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});