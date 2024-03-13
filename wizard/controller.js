let widgetsView = angular.module('widgets', ['ideUI', 'ideView']);

widgetsView.config(["messageHubProvider", function (messageHubProvider) {
    messageHubProvider.eventIdPrefix = 'template';
}]);

widgetsView.directive('dynamicWizardStep', function ($compile) {
    return {
        restrict: 'E',
        scope: {},
        template: `
            <fd-wizard-step dg-size="md" ng-attr-dg-label="{{ 'Step ' + stepCount + ': Create a record' }}" ng-attr-indicator-label="{{ stepCount }}"
                ng-attr-indicator-glyph="{{ getIndicatorGlyph(stepCount) }}" step-click="gotoStep(stepCount)">
                <div id="create-component">
                    <fd-form-item horizontal="false">
                        <fd-form-label for="iid1-hover" dg-colon="true" dg-required="true">
                            Supplier
                        </fd-form-label>
                        <fd-input id="iid1-hover" type="text" is-hover="false" placeholder="Placeholder text">
                        </fd-input>
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


// Initialize controller
widgetsView.controller('WidgetsViewController', ['$scope', 'messageHub', function ($scope, messageHub) {

    $scope.btnText = "Badge button";
    $scope.btnType = "positive";
    $scope.btnState = "";
    $scope.btnToggled = true;

    $scope.splitButtonAction = "Action";
    $scope.segmentedModel = "middle";
    $scope.fdCheckboxModel = true;
    $scope.fdRadioModel = false;
    $scope.tristate = false;
    $scope.menusShown = false;
    $scope.fdListItem = { checkboxModel: true };
    $scope.objectStatusIndicator = 8;
    $scope.stepInputValue = 4;
    $scope.selectSelectedValue = 2;

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.totalItems = 100;
    $scope.tableWithPaginationItems = [];
    for (let i = 0; i < $scope.totalItems; i++) {
        $scope.tableWithPaginationItems.push({
            product: `Item ${i + 1}`,
            price: '$' + (Math.random() * 100).toFixed(2),
            amount: Math.floor(Math.random() * 1000)
        });
    }

    $scope.tabs = [...Array(10).keys()].map(i => ({ label: `Tab label ${i + 1}`, id: `tab_${i + 1}` }));
    $scope.isMoreTabsButtonVisible = (tabs) => tabs.some(x => x.isHidden);

    $scope.selectedTab = 'ti1pan';

    $scope.lastInputValue = "";

    function isText(keycode) {
        if (keycode >= 48 && keycode <= 90 || keycode >= 96 && keycode <= 111 || keycode >= 186 && keycode <= 222 || [8, 46, 173].includes(keycode)) return true;
        return false;
    }

    $scope.onTabClose = function (tabId) {
        console.log(tabId);
    };

    $scope.onTabClick = function () {
        console.log('tab click');
    };

    $scope.switchTab = function (tabId) {
        $scope.selectedTab = tabId;
    };

    $scope.onComboInputChange = function (event) {
        if (isText(event.which)) {
            if (event.originalEvent.target.value === "") {
                $scope.dynamicItems = [
                    { value: 1, text: 'Default value 1' },
                    { value: 2, text: 'Default value 2' },
                    { value: 3, text: 'Default value 3' },
                    { value: 4, text: 'Default value 4' },
                    { value: 5, text: 'Default value 5' },
                ];
            } else if ($scope.lastInputValue !== event.originalEvent.target.value) {
                // Back-end stuff
                $scope.dynamicItems.length = 0;
                for (let i = 0; i < event.originalEvent.target.value.length; i++) {
                    $scope.dynamicItems.push({ value: i, text: `Dynamic value ${event.originalEvent.target.value} ${i + 1}` });
                }
            }
            $scope.lastInputValue = event.originalEvent.target.value;
        }
    };

    $scope.dynamicItems = [
        { value: 1, text: 'Default value 1' },
        { value: 2, text: 'Default value 2' },
        { value: 3, text: 'Default value 3' },
        { value: 4, text: 'Default value 4' },
        { value: 5, text: 'Default value 5' }
    ];

    $scope.comboboxItems = [
        { value: 1, text: 'Apple' },
        { value: 2, text: 'Pineapple' },
        { value: 3, text: 'Banana' },
        { value: 4, text: 'Kiwi' },
        { value: 5, text: 'Strawberry' }
    ];

    $scope.comboboxItems2 = [
        { value: 1, text: 'Product 1', secondaryText: '1000 EUR' },
        { value: 2, text: 'Product 2', secondaryText: '750 EUR' },
        { value: 3, text: 'Product 3', secondaryText: '780 EUR' },
        { value: 4, text: 'Product 4', secondaryText: '40 EUR' }
    ];

    $scope.multiComboboxItems = [
        { value: 1, text: 'Apple' },
        { value: 2, text: 'Pineapple' },
        { value: 3, text: 'Banana' },
        { value: 4, text: 'Kiwi' },
        { value: 5, text: 'Strawberry' }
    ];
    $scope.multiComboboxSelectedItems = [1];

    $scope.splitItemClick = function (selected) {
        $scope.splitButtonAction = selected;
    };

    $scope.splitButtonClick = function () {
        messageHub.showAlertInfo(
            "Split button clicked",
            'You have clicked on the main action button.'
        );
    };

    $scope.popoverItemClick = function () {
        messageHub.showAlertInfo(
            "Popover item selected",
            'You have selected a popover item.'
        );
    }

    $scope.segmentedClick = function (item) {
        $scope.segmentedModel = item;
    };

    $scope.contextMenuContent = function (element) {
        return {
            callbackTopic: "template.widgets.contextmenu",
            items: [
                {
                    id: "new",
                    label: "New",
                    icon: "sap-icon--create",
                    items: [
                        {
                            id: "file",
                            label: "File",
                            icon: "sap-icon--document"
                        },
                        {
                            id: "folder",
                            label: "Folder",
                            icon: "sap-icon--folder-blank",
                            items: [
                                {
                                    id: "file1",
                                    label: "File",
                                    icon: "sap-icon--document"
                                },
                                {
                                    id: "folder1",
                                    label: "Folder",
                                    icon: "sap-icon--folder-blank"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: "copy",
                    label: "Copy",
                    shortcut: "Ctrl+C",
                    divider: true,
                    icon: "sap-icon--copy"
                },
                {
                    id: "paste",
                    label: "Paste",
                    shortcut: "Ctrl+V",
                    icon: "sap-icon--paste"
                },
                {
                    id: "other",
                    label: "Other",
                    divider: true,
                    icon: "sap-icon--question-mark"
                }
            ]
        }
    };

    $scope.toggle = function () {
        $scope.btnToggled = !$scope.btnToggled;
    };

    $scope.steps = [
        { id: 1, name: "Create a Purchase Invoice", topicId: "template.widgets.screeen.one" }
    ];
    $scope.currentStep = $scope.steps[0];

    messageHub.onDidReceiveMessage(
        "widgets.contextmenu",
        function (msg) {
            messageHub.showAlertInfo(
                "Context menu item selected",
                `You have selected a menu item with the following id - ${msg.data}`
            );
        }
    );

    $scope.setStep = function (topicId) {
        for (let i = 0; i < $scope.steps.length; i++) {
            if ($scope.steps[i].topicId === topicId) {
                $scope.currentStep = $scope.steps[i];
                break;
            }
        };
    };

    $scope.isStepActive = function (stepId) {
        if (stepId == $scope.currentStep.id)
            return "active";
        else if (stepId < $scope.currentStep.id)
            return "done";
        else
            return "inactive";
    };

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

    $scope.filesToUpload = [
        { fileName: 'file1', extension: 'txt', selected: false },
        { fileName: 'file2', extension: 'txt', selected: false },
        { fileName: 'file3', extension: 'txt', selected: false }
    ];

    $scope.removeFileToUpload = function (file) {
        let index = $scope.filesToUpload.indexOf(file);
        if (index >= 0)
            $scope.filesToUpload.splice(index, 1);
    };

    $scope.select = {
        s1: 1,
        s2: 2,
        s3: 3,
        s4: 4,
        s5: 2,
        onS1Change: function () {
            console.log($scope.select.s1);
        }
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
