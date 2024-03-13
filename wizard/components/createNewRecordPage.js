
function createNewRecordPage() {
    console.log("test");

    let recordPageHtml = `
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
    `

    let nextStepHtml = `
        <fd-wizard-step dg-label=" Step 2: Create a record" indicator-label="2"
            indicator-glyph="{{ getIndicatorGlyph(2) }}" step-click="gotoStep(step)">
            <div id="create-component">
                <fd-button dg-label="Add Item" dg-type="emphasized" ng-click="createNewRecordPage()">
                </fd-button>
            </div>
        </fd-wizard-step>
    `

    let componentDiv = document.querySelectorAll(".create-component");
    console.log(componentDiv)
    componentDiv.length > 0 ? componentDiv[componentDiv.length - 1].innerHTML = recordPageHtml : "";

    // let wizardContent = document.querySelectorAll(".wizard-content");
    // console.log(wizardContent[0].innerHTML)
    // wizardContent.length > 0 ? wizardContent[wizardContent.length - 1].innerHTML += nextStepHtml : "";
    // console.log(wizardContent[0].innerHTML)
}