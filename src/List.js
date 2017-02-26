import $ from "jquery";
import { store } from "./Store"
import { renderUser } from "./User";

export function renderList (name = "contributions") {
    const root = $("#root");
    let list = $(".list");

    if (!(list.length)) {
        root.append($("<ul class='list'></ul>"));
        list = $("ul.list");
    }

    list.empty();
    const items = store.state.mapUsers.map((item) => createTemplate(item, name));
    list.append(items);

    assignListEvents();
}

function assignListEvents () {
    const li = $("li");

    li.on("click", function () {
        const that = $(this);
        renderUser(that)
    })
}

function createTemplate (item, name) {
    const li = $("<li></li>");
    li.data("user", item);
    const template = `<div>
                        ${item.login} <b>${item[name]}</b>
                      </div>`;

    li.append(template);
    return li
}

export function sortUsers (data, filter, type) {
    if (type === "asc") {
        data.sort((a, b) => b[filter] - a[filter]);
        renderList(filter)
    } else if (type === "desc") {
        data.sort((a, b) => a[filter] - b[filter]);
        renderList(filter)
    }
}
