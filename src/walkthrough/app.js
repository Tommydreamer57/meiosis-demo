import React from 'react';

// Export a function that takes in `update` as a parameter...
export default function createApp(update) {

    // ...and returns an object...
    return {
        // ...with methods `model`...
        model() {
            // ...that returns an object...
            return {};
        },
        // ...and `view`, which is a function of the `model`...
        view(model) {
            // ...that returns JSX.
            return (
                <div id="app">
                    APP
                </div>
            );
        }
    };
}
