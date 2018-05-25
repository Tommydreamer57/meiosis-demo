import React from 'react';

export default function createApp(update) {
    return {
        model() {
            return {};
        },
        view(model) {
            return (
                <div id="app">
                    APP
                </div>
            );
        }
    };
}