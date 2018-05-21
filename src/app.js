import React from 'react';
import initialModel from './model';
import createList from './components/list';
import createAdd from './components/add';

export default function createApp(update) {
    let list = createList(update);
    let add = createAdd(update);
    return {
        model() {
            return initialModel;
        },
        view(model) {
            return (
                <div id="app" >
                    {list.view(model)}
                    {add.view(model)}
                </div>
            );
        }
    };
}
