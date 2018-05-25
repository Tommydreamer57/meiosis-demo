import * as u from './utils';

export const {
    stream,
    scan,
    nestComponent
} = u;

export default function initialize(createApp, render, ...middleWares) {
    // UPDATE
    let update = stream();

    // APP
    let app = createApp(update);

    // INITIAL MODEL
    let initialModel = app.model();

    // MODELS
    // -- callback (argument of update function), initialmodel, stream
    let models = scan((model, cb) => cb(model), initialModel, update);

    // CONNECT RENDER TO STREAMS
    models.map(render(app));

    // ADD MIDDLEWARES
    for (let fn of middleWares) {
        models.map(fn);
    }

    // INITIALIZE APP
    models(initialModel);
}