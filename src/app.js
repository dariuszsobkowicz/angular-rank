import $ from "jquery"
import { store, dispatchData, filter } from "./components/store/Store";
import { renderList, sortUsers } from "./components/list/List"

import "meyer-reset-sass";
import "./scss/main.scss"

$(function () {
    dispatchData(function () {
        renderList();
    });

});
