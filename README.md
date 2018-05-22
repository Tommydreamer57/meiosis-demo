
# Meiosis Demo (React)

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

<summary><code>meiosis.js</code></summary>

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

Notice the first two lines of the function create the `app` and the initial model by passing the update function into `createApp`, and then invoking the returned `app`'s `model` method:
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

And now the `update` function. This is the `function` we passed down to the `app` so that the `app` can update the `model`.
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

<details>

<summary><code>meiosis.js</code></summary>

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

</details>

<br/>

## App Component

Before we go into the `update` function, let's take a look at what a component looks like:

<summary><code>app.js</code></summary>

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

<details>

<summary><code>meiosis.js</code></summary>

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

</details>

<details>

<summary><code>app.js</code></summary>

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

</details>

<br/>

## Rendering

There's just one missing piece to get meiosis completely set up for the application. That is the `render` function.

With `React` it looks like this:
```js
const $root = document.getElementById("root");

const render = view => ReactDOM.render(view, $root);
```
`render` takes in the `view` of the app, and renders it to the `#root` DOM element. Using the [`ReactDOM.render`](https://reactjs.org/docs/react-dom.html#reference) method takes advantage of React's virtual DOM, allowing React to diff the previous view against the updated view and only mutate the DOM as necessary each time `update` is called.

<br/>

And now all we have to do to get our app up and running is invoke `meiosis` with our `createApp` and `render` functions:
```js
meiosis(createApp, render);
```

<br/>

And now our `index.js` looks like this:

<summary><code>index.js</code></summary>

```js
import ReactDOM from 'react-dom';
import meiosis from './meiosis';
import createApp from './app';

const $root = document.getElementById("root");

const render = view => ReactDOM.render(view, $root);

meiosis(createApp, render);
```

<br/>

<details>

<summary><code>meiosis.js</code></summary>

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

</details>

<details>

<summary><code>index.js</code></summary>

```js
import ReactDOM from 'react-dom';
import meiosis from './meiosis';
import createApp from './app';

const $root = document.getElementById("root");

const render = view => ReactDOM.render(view, $root);

meiosis(createApp, render);
```

</details>

<details>

<summary><code>app.js</code></summary>

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

</details>

<details>

<summary><code>index.js</code></summary>

```js
import ReactDOM from 'react-dom';
import meiosis from './meiosis';
import createApp from './app';

const $root = document.getElementById("root");

const render = view => ReactDOM.render(view, $root);

meiosis(createApp, render);
```

<br/>

</details>

<br/>

## Components

Now we've got meiosis set up and our app rendered. Let's add a component into the app.

Each meiosis component will look very similar to the `app` component we already created:

<summary><code>list.js</code></summary>

```js
import React from 'react';

export default function createList(update) {

    return {
        view(model) {
            return (
                <div>
                    
                </div>
            );
        }
    };
}
```
Notice how this component does not have it's own model method. It simply returns a view of the `app`'s model.

<br/>

In order to use this component, we'll need to import it into the app, like so:

<summary><code>app.js</code></summary>

```js
import React from 'react';
import createList from './list';

export default function createApp(update) {

    let list = createList(update);

    return {
        model() {
            return {

            };
        },
        view(model) {
            return (
                <div id="app" >
                    {list.view(model)}
                </div>
            );
        }
    };
}
```
There are three parts to this. First, the `import` statement, then invoking the component with `update` as an argument, and lastly, including the created component's view inside the `app`'s view.

<br/>

Now let's add some data to the `app`'s `model` so we can actually see something on the screen:

<summary><code>app.js</code></summary>

```js
import React from 'react';
import createList from './list';

export default function createApp(update) {

    let list = createList(update);

    return {
        model() {
            return {
                listItems: [
                    "one",
                    "two",
                    "three"
                ]
            };
        },
        view(model) {
            return (
                <div id="app" >
                    {list.view(model)}
                </div>
            );
        }
    };
}
```

<br/>

Then let's display that data in the `list` component:

<summary><code>list.js</code></summary>

```js
import React from 'react';

export default function createList(update) {

    return {
        view(model) {
            return (
                <div>
                    {model.listItems.map(item => (
                        <div key={item} >{item}</div>
                    ))}
                </div>
            );
        }
    };
}
```
Now you should see a list of "one two three" in the browser. One of the great things about meiosis is that each component has direct access to the entire `model` and can display whichever data it needs.

<br/>

<details>

<summary><code>meiosis.js</code></summary>

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

</details>

<details>

<summary><code>index.js</code></summary>

```js
import ReactDOM from 'react-dom';
import meiosis from './meiosis';
import createApp from './app';

const $root = document.getElementById("root");

const render = view => ReactDOM.render(view, $root);

meiosis(createApp, render);
```

</details>

<details>

<summary><code>app.js</code></summary>

```js
import React from 'react';
import createList from './list';

export default function createApp(update) {

    let list = createList(update);

    return {
        model() {
            return {
                listItems: [
                    "one",
                    "two",
                    "three"
                ]
            };
        },
        view(model) {
            return (
                <div id="app" >
                    {list.view(model)}
                </div>
            );
        }
    };
}
```

</details>

<details>

<summary><code>list.js</code></summary>

```js
import React from 'react';

export default function createList(update) {

    return {
        view(model) {
            return (
                <div>
                    {model.listItems.map(item => (
                        <div key={item} >{item}</div>
                    ))}
                </div>
            );
        }
    };
}
```

</details>

<br/>

## Updating the Model

Now the app has a static `view` that renders its initial `model`. Let's add another component to make the data dynamic:

<summary><code>input.js</code></summary>

```js
import React from 'react';

export default function createInput(update) {

    return {
        view(model) {
            return (
                <input />
            );
        }
    };
}
```

<br/>

And let's bring the new component into the `app` so we can start to interact with the `model`.

<summary><code>app.js</code></summary>

```js
import React from 'react';
import createList from './list';
import createInput from './input';

export default function createApp(update) {

    let list = createList(update);
    let input = createInput(update);

    return {
        model() {
            return {
                listItems: [
                    "one",
                    "two",
                    "three"
                ]
            };
        },
        view(model) {
            return (
                <div id="app" >
                    {list.view(model)}
                    {input.view(model)}
                </div>
            );
        }
    };
}
```
Just like with the `list` component, we imported the component, created it on the top-level of the `app` component, and rendered its `view` inside the `app`'s `view`.

<br/>

Now let's go back to the `input` and deal with handling input and updating the model.

Remember how the `update` function takes in a callback and expects a new `model` to be returned?
```js
function update(callback) {
    let newModel = callback(currentModel);

    if (newModel) {
        currentModel = newModel;
        render(app.view(currentModel));
    }
}
```

<br/>

Let's add an event-listener to the `input` so that we can update the model when a user hits `Enter`.

<summary><code>input.js</code></summary>

```js
import React from 'react';

export default function createInput(update) {

    function onKeyDown({ target, key }) {
        if (key === "Enter") {
            update(model => ({
                ...model,
                listItems: [...model.listItems, target.value]
            }));
            target.value = '';
        }
    }

    return {
        view(model) {
            return (
                <input onKeyDown={onKeyDown} />
            );
        }
    };
}
```

<br/>

So `onKeyDown` of the `input`, we're destructuring `target` and `key` off of the event object.
`Target` is a direct reference to the `input` DOM element, and `key` is the key that was pressed.
```js
function onKeyDown({ target, key }) { }
```

<br/>

If the `Enter` key was pressed, we want to update the model, pushing the `target.value` onto the list of items that was already on the model.
```js
if (key === "Enter") { }
```

<br/>

So we invoke `update` with a callback function that takes in the old `model` as a parameter and returns the new `model` with `target.value` added to the `listItems` array.
```js
update(model => ({
    ...model,
    listItems: [...model.listItems, target.value]
}));
```
Since we returned a new `model`, `update` will invoke `ReactDOM.render` again, passing in the new `model` into our `app`'s `view`.

<br/>

Then, we directly reset the value of the `input` to an empty string.
```js
target.value = '';
```

<br/>

Now we've successfully set up meiosis, created an app with multiple components, and can add items to the list and refresh the list component.

<br/>

<details>

<summary><code>meiosis.js</code></summary>

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

</details>

<details>

<summary><code>index.js</code></summary>

```js
import ReactDOM from 'react-dom';
import meiosis from './meiosis';
import createApp from './app';

const $root = document.getElementById("root");

const render = view => ReactDOM.render(view, $root);

meiosis(createApp, render);
```

</details>

<details>

<summary><code>app.js</code></summary>

```js
import React from 'react';
import createList from './list';
import createInput from './input';

export default function createApp(update) {

    let list = createList(update);
    let input = createInput(update);

    return {
        model() {
            return {
                listItems: [
                    "one",
                    "two",
                    "three"
                ]
            };
        },
        view(model) {
            return (
                <div id="app" >
                    {list.view(model)}
                    {input.view(model)}
                </div>
            );
        }
    };
}
```

</details>

<details>

<summary><code>list.js</code></summary>

```js
import React from 'react';

export default function createList(update) {

    return {
        view(model) {
            return (
                <div>
                    {model.listItems.map(item => (
                        <div key={item} >{item}</div>
                    ))}
                </div>
            );
        }
    };
}
```

</details>

<details>

<summary><code>input.js</code></summary>

```js
import React from 'react';

export default function createInput(update) {

    function onKeyDown({ target, key }) {
        if (key === "Enter") {
            update(model => ({
                ...model,
                listItems: [...model.listItems, target.value]
            }));
            target.value = '';
        }
    }

    return {
        view(model) {
            return (
                <input onKeyDown={onKeyDown} />
            );
        }
    };
}
```

</details>
