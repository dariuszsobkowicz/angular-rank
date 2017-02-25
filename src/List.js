import $ from "jquery";
import { store } from "./Store"
import { getQty } from "./Filter"

export function renderList (name = "contributions") {
    const root = $("#root");
    let list = $(".list");

    if (!(list.length)) {
        root.append($("<ul class='list'></ul>"));
        list = $("ul.list");
    }

    list.empty();
    const items = store.state.mapUsers.map((item) => createTemplate(item, name));
    list.append(items)
}

function createTemplate (item, name) {
    return `<li>
               ${item.login} <b>${item[name]}</b>
            </li>`
}

export function sortUsers (data, filter, type) {

    getQty(filter, function () {

        if (type === "asc") {
            data.sort((a, b) => b[filter.name] - a[filter.name]);
            renderList(filter.name)
        } else if (type === "desc") {
            data.sort((a, b) => a[filter.name] - b[filter.name]);
            renderList(filter.name)
        }

    });

}
