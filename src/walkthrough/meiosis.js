
export default function meiosis(createApp, render) {

    const app = createApp(update);

    let currentModel = app.model();

    function update(callback) {
        let newModel = callback(currentModel);

        if (newModel) {
            currentModel = newModel;
            render(app.view(currentModel));
        }
    }

    render(app.view(currentModel));

}
