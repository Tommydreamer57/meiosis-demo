
// Look at meiosis docs to see implementation of stream & scan at top level

// createApp = function to create root app meiosis component
// render = function to render app to the dom
// middlewares = functions to invoke on the previous and currentmodel anytime there is a change
export default function meiosis(createApp, render) {

    // create the app, passing in the update function
    let app = createApp(update);

    // current model starts at the app's model
    let currentModel = app.model();

    // update = function to update the model and rerender the app
    function update(callback) {

        // invoke the callback function on the current model
        let newModel = callback(currentModel);

        // if a new model was returned
        if (newModel) {

            // update the previous & current models
            currentModel = newModel;

            // rerender app with the updated model
            render(app.view(currentModel));

        }

    }

    // render the app initially
    render(app.view(currentModel));

}
