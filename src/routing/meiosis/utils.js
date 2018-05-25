
// STREAM
// -- initial
export function stream(initial) {
    // LIST OF FUNCTIONS TO INVOKE WHEN THE CREATED STREAM IS INVOKED
    let mapFunctions = [];
    // CREATED STREAM TO RETURN
    function createdStream(value) {
        // INVOKE ALL FUNCTIONS
        for (let fn of mapFunctions) fn(value);
    }
    // METHOD OF ADDING FUNCTIONS TO THE LIST
    createdStream.map = mapFn => {
        let newInitial;
        if (initial !== undefined) newInitial = mapFn(initial);
        let newStream = stream(newInitial);
        // ADD THE NEW FUNCTION TO THE LIST
        mapFunctions.push(value => newStream(mapFn(value)));
        return newStream;
    }
    // RETURN THE CREATED STREAM
    return createdStream;
}

// SCAN
// -- accumulator merges our old model to our new model -- initialModel of our application -- sourceStream = update function
export function scan(accumulator, initialModel, sourceStream) {
    let newStream = stream(initialModel);
    // ACCUMULATED IS THE MODEL OF OUR APP
    let accumulated = initialModel;
    sourceStream.map(callback => {
        // COPY ACCUMULATED VALUE
        let oldAccumulated = accumulated;
        // INVOKE ACCUMULATOR & CAPTURE RESULT
        let newAccumulated = accumulator(accumulated, callback);
        // IF NO RESULT, LEAVE ACCUMULATOR THE SAME AND DO NOT UPDATE MODEL
        if (!newAccumulated) return;
        else {
            // REASSIGN ACCUMULATED TO THE UPDATED VALUE (the result of the update function)
            accumulated = newAccumulated;
            return newStream(accumulated);
        }
    });
    return newStream;
}

// NEST UPDATE
function nestUpdate(update, prop) {
    return cb => update(model => ({ ...model, [prop]: cb(model[prop]) }));
}

// NEST
export function nestComponent(create, update, prop) {
    let component = create(nestUpdate(update, prop));
    if (component.model) {
        component.model = () => ({ [prop]: component.model() });
    }
    if (component.view) {
        component.view = (model, props) => component.view(model[prop] || {}, props || {});
    }
    return component;
}
