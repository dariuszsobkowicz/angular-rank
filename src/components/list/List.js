import $ from "jquery";
import { store, filter } from "../../Store"
import { renderUser } from "../user/User";

import "./list.scss"

let num = 0;

export function renderList (name = "contributions") {
    const root = $("#root");
    const filters = createFilters();
    const list = createList(name);
    num = 30;

    root.empty();
    root.append(filters);
    root.append(list);

    root.append($("<div class='more'><button>Show more</button></div>"));
    hideItems();

    assignListEvents();
}

function replaceList (name) {
    const list = $(".list");
    list.empty();
    const items = store.state.mapUsers.map((item) => createTemplate(item, name));
    list.append(items);

    hideItems();
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
                <div><button class="contributions active">Contributions</button></div>
                <div><button class="followers">Followers</button></div>
                <div><button class="repos">Repositories</button></div>
                <div><button class="gists">Gists</button></div>
             </div>`;
}

function hideItems () {
    const items = $(".list li");
    items.hide();
    $(".list li:lt("+num+")").show();
}

function assignListEvents () {
    const list = $(".list");
    const close = $(".close");

    list.on("click", "li", function (e) {
        e.stopImmediatePropagation();
        const that = $(this);
        const user = that.data("user");
        $(".lightbox-container").slideDown(300);
        $("body").css({
            "position": "fixed"
        });

        renderUser(user)
    });

    $(".contributions").on("click", function () {
        sortToggler($(this), filter.contributions);
    });
    $(".followers").on("click", function () {
        sortToggler($(this), filter.followers);
    });
    $(".repos").on("click", function () {
        sortToggler($(this), filter.repos);
    });
    $(".gists").on("click", function () {
        sortToggler($(this), filter.gists);
    });

    $(".more button").on("click", function () {
        const items = $(".list li");
        const listSize = items.length;

        num = (num + 30 <= listSize) ? num + 30 : listSize;
        $('.list li:lt('+num+')').show();
        !(num >= listSize) || $(".more").hide();
    });

}

function sortToggler (elem, filter) {
    const body = $("body");
    let sort = "";
    if (elem.is(".active")) {
        sort = elem.is(".desc") ? "desc" : "asc";
        elem.toggleClass("desc");
    } else {
        $(".filters button").each(function () {
            $(this).removeClass("active");
        });
        elem.addClass("active");
        sort = "desc"
    }
    !(body.scrollTop() >= 2000) || body.scrollTop(0);
    sortUsers(store.state.mapUsers, filter, sort)
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
    if (type === "desc") {
        data.sort((a, b) => b[filter] - a[filter]);
        replaceList(filter)
    } else if (type === "asc") {
        data.sort((a, b) => a[filter] - b[filter]);
        replaceList(filter)
    }
}
