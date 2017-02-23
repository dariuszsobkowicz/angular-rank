import $ from "jquery"
import {store, getData} from "./Store";


getData(store, function () {
    console.log(store)
});
