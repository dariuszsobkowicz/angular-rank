import $ from "jquery";
import { store, filter } from "../store/Store"
import { renderUser } from "../user/User";

import "./list.scss"

export function renderList (name = "contributions") {
    const root = $("#root");
    const filters = createFilters();
    const list = createList(name);

    root.empty();
    root.append(filters);
    root.append(list);

    assignListEvents();
}

function replaceList (name) {
    const list = $(".list");
    list.empty();
    const items = store.state.mapUsers.map((item) => createTemplate(item, name));
    list.append(items);
}

function createList (name) {
    let list = $(".list");
    if (!list.length) {
        list = $("<ul class='list'></ul>");
    }
    list.empty();
    const items = store.state.mapUsers.map((item) => createTemplate(item, name));
    list.append(items);
    return list
}

function createFilters () {
    return `<div class="filters">
                <div><button class="contributions desc">Contributions</button></div>
                <div><button class="followers desc">Followers</button></div>
                <div><button class="repos desc">Repositories</button></div>
                <div><button class="gists desc">Gists</button></div>
             </div>`;
}

function assignListEvents () {
    const list = $(".list");

    list.on("click", "li", function () {
        const that = $(this);
        renderUser(that)
    });

    $(".contributions").on("click", function () {
        sortUsers(store.state.mapUsers, filter.contributions, "desc")
    });
    $(".followers").on("click", function () {
        sortUsers(store.state.mapUsers, filter.followers, "asc")
    });
    $(".repos").on("click", function () {
        sortUsers(store.state.mapUsers, filter.repos, "asc")
    });
    $(".gists").on("click", function () {
        sortUsers(store.state.mapUsers, filter.gists, "asc")
    });
}

function createTemplate (item, name) {
    const li = $("<li class='list-item'></li>");
    let number = item[name] === 0 ? "zero" : "+" + item[name];
    let location = item.location === null ? "" : item.location;
    li.data("user", item);
    const template = `<div><img src=${item.avatar_url} alt=${item.login} class="img-fluid"></div>
                      <div class="user-name">${item.login}</div>
                      <div class="location">${location}</div>
                      <div>${number}</div>`;

    li.append(template);
    return li
}

export function sortUsers (data, filter, type) {
    if (type === "asc") {
        data.sort((a, b) => b[filter] - a[filter]);
        replaceList(filter)
    } else if (type === "desc") {
        data.sort((a, b) => a[filter] - b[filter]);
        replaceList(filter)
    }
}
