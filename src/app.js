import $ from "jquery"
import { store, dispatchData } from "./Store";
import { filter } from "./Filter"
import { renderList, sortUsers } from "./List"


$(function () {
    dispatchData(function () {
        console.log("READY");
        renderList()
    });
});

$("#contributions").on("click", function () {
    sortUsers(store.state.mapUsers, filter.contributions, "desc")
});
$("#followers").on("click", function () {
    sortUsers(store.state.mapUsers, filter.followers, "asc")
});
$("#repos").on("click", function () {
    sortUsers(store.state.mapUsers, filter.repos, "asc")
});
$("#gists").on("click", function () {
    sortUsers(store.state.mapUsers, filter.gists, "asc")
});