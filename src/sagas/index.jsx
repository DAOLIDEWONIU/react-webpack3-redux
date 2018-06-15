'use strict';
import watchLoginAsync from './login';


export default function* rootSaga() {
    yield [
        watchLoginAsync()
    ];
}