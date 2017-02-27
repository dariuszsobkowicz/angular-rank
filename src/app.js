import $ from "jquery"
import { dispatchData } from "./components/store/Store";
import { renderList } from "./components/list/List"

import "meyer-reset-sass";
import "./scss/main.scss"
import "./scss/lightbox.scss"

$(function () {
    dispatchData(function () {
        renderList();
    });
});