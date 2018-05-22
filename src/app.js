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
