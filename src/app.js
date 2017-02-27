import $ from "jquery"
import { dispatchData, store } from "./components/store/Store";
import { renderList } from "./components/list/List"

import "meyer-reset-sass";
import "./scss/main.scss"
import "./scss/lightbox.scss"

$(function () {
    dispatchData(function () {
        renderList();
        window.localStorage.setItem("store", JSON.stringify(store));
    });
});