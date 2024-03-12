
function createNewRecordPage() {
    console.log("test");

    let innerHTML = `
        <fd-form-item horizontal="false">
            <fd-form-label for="iid1-hover" dg-colon="true" dg-required="true">
                Supplier
            </fd-form-label>
            <fd-input id="iid1-hover" type="text" is-hover="false" placeholder="Placeholder text">
            </fd-input>
        </fd-form-item>
        <fd-form-item horizontal="false">
            <fd-form-label for="iid1-hover" dg-colon="true" dg-required="true">
                Currency
            </fd-form-label>
            <fd-input id="iid1-hover" type="text" is-hover="false" placeholder="Placeholder text">
            </fd-input>
        </fd-form-item>
        <fd-form-item horizontal="false">
            <fd-form-label for="iid1-hover" dg-colon="true" dg-required="true">
                Status
            </fd-form-label>
            <fd-input id="iid1-hover" type="text" is-hover="false" placeholder="Placeholder text">
            </fd-input>
        </fd-form-item>
        <fd-form-item horizontal="false">
            <fd-form-label for="iid1-hover" dg-colon="true" dg-required="true">
                Operator
            </fd-form-label>
            <fd-input id="iid1-hover" type="text" is-hover="false" placeholder="Placeholder text">
            </fd-input>
        </fd-form-item>
    <script type="text/javascript" src="controller.js"></script>
    dfg
    `

    let nextStep = `
        <fd-wizard-step dg-label=" Step 2: Create a record" indicator-label="2"
            indicator-glyph="{{ getIndicatorGlyph(2) }}" step-click="gotoStep(step)">
            <div id="create-component">
                <fd-button dg-label="Add Item" dg-type="emphasized" ng-click="createNewRecordPage()">
                </fd-button>
            </div>
        </fd-wizard-step>
        <script type="text/javascript" src="controller.js"></script>
        asd
    `


    //* Remove typescript warning
    let componentDiv = document.getElementById("create-component");
    componentDiv ? componentDiv.innerHTML = innerHTML : "";

    let wizardContent = document.getElementById("wizard-content");
    wizardContent ? wizardContent.innerHTML += nextStep : "";
}