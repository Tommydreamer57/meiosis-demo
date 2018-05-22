
# Meiosis Demo (React)

<!-- <br/> -->

Meiosis is a pattern for managing state in an application.
It is a lightweight alternative to Redux that requires no libraries and allows for more direct control over state.
Meiosis is easily compatible with virtual DOM libraries like React and Vue.

A meiosis architecture done right can lead to drier code with fewer `import` statements and more vanilla JavaScript.

The official documentation of meiosis can be found [here](https://meiosis.js.org/).

<br/>

## Model & View

Meiosis is built on the concept of models and views.
"Model" refers to the data or state of an application.
"View" refers to what is displayed on the screen.

In meiosis, the `view` is a function of the `model`, meaning that, given a specific `model`, the `view` will always be the same.
In order to update the `model`, each `view` has access to the `update` function, provided by meiosis, that takes in the old model as an argument and returns the updated model.

With this simple pattern, we minimize the passing of data and methods through `props`, because each component can directly update the model of the application.
This also allows us to easily break our code into smaller, independent pieces, hence the name "Meiosis".

<br/>

## Meiosis on the Top Level

### Stream

Meiosis uses what is called a `stream` to manage updating the model. If you want to learn more about using a `stream` in meiosis, you can follow the tutorial [here](http://meiosis.js.org/tutorial/toc.html).

### Simplified

For the sake of this demo, we're going to use a much simpler function that takes about half the code and mimics the functionality of the `stream`.

 - If you are unfamiliar with meiosis, I recommend taking a brief look at the code in the next section before moving on so that you'll understand the top-level function better.

```js
export default function meiosis(createApp, render) {

    let app = createApp(update);
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
```

This top-level function creates the initial `model` as well as a function to update that model, and renders the app's `view` of the initial `model` to the DOM.

There are quite a few things going on here so let's break it down a bit:

<br/>

The top-level function takes in two `functions` as parameters - one to create the app, and one to render it to the DOM:
```js
function meiosis(createApp, render) { }
```

<br/>

Notice the first two lines of the function create the app and the initial model by passing the update function into `createApp`, and then invoking the returned `app`'s `model` method:
```js
let app = createApp(update);
let currentModel = app.model();
```

<br/>

And the last line renders the app's view of the initial model by invoking `render` and passing the `app`'s `view` of the initial model:
```js
render(app.view(currentModel));
```

<br/>

And now the `update` function. This is the `function` we passed down to the app so that the app can update the `model`.
```js
function update(callback) {
    let newModel = callback(currentModel);

    if (newModel) {
        currentModel = newModel;
        render(app.view(currentModel));
    }
}
```
`Update` will invoke the `callback`, passing in the current model, and expect the `callback` to return a new model. If a new model is returned, the `app`'s `view` will be invoked with the new model and rerendered to the DOM.

<br/>

## Meiosis Components

Before we go into the top-level function that manages updates, let's take a look at what a component looks like:

```js
import React from 'react';

export default function createApp(update) {

    return {
        model() {
            return {

            };
        },
        view(model) {
            return (
                <div id="app" >
                    
                </div>
            );
        }
    };
}
```

This is the basic setup for a meiosis component. It takes in the `update` function as a parameter and returns an object with keys `model` and `view`.
Notice how the `view` is literally a function of the `model`, and it returns the JSX that is to be rendered to the screen.

<br/>

## Rendering

There's just one missing piece to get meiosis completely set up for the application. That is the `render` function.

With `React` it looks like this:

```js
const $root = document.getElementById("root");

const render = view => ReactDOM.render(view, $root);
```

`render` takes in the `view` of the app, and renders it to the `#root` DOM element.

And now all we have to do to get our app up and running is invoke `meiosis, passing in our `createApp` and `render` functions.

meiosis(createApp, render);

<br/>
<br/>
<br/>
