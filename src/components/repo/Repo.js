import $ from "jquery";
import { store } from "../store/Store";
import { renderUser, cleanContainer } from "../user/User";

export function renderRepo (name) {
    let users = [];
    let repo = [];

    for (let key in store.state.mapReposUsers) {
        if (key === name) {
            users = [...store.state.mapReposUsers[key]]
        }
    }

    for (let key in store.state.mapReposName) {
        if (key === name) {
            repo = store.state.mapReposName[key]
        }
    }

    cleanContainer();

    const frame = repoTemplate(repo, users);

    $(".lightbox").append(frame);

    $(".box-list").on("click", "li", function (e) {
        e.stopImmediatePropagation();
        const that = $(this);
        const user = that.data("user");
        renderUser(user);
    });
}

function repoTemplate (repo, users) {
    const box = $("<div class='box-frame'></div>");
    const forks = repo.forks === 0 ? "zero" : repo.forks;
    const watchers = repo.watchers === 0 ? "zero" : repo.watchers;
    let counter = 0;

    const userDetails = `<div class="box-details">
                            <h2>${repo.name}</h2>
                            <ul>
                                <li class="box-details-item">Forks <span class="box-details-number">${repo.forks}</span></li>
                                <li class="box-details-item">Watchers <span class="box-details-number">${repo.watchers}</span></li>
                            </ul>
                         </div>`;

    const reposContainer = $("<div class='box-list'></div>");
    const ul = $("<ul></ul>");
    const reposList = users.map((user) => {
        counter++;
        const name = user.name === null ? user.login : user.name;
        const elem = $("<li class='box-list-item'></li>");
        const span = $("<span class='repo-name'></span>");
        elem.data("user", user);
        span.text(name);
        elem.append(span);
        return elem;
    });
    ul.append(reposList);
    const h3 = `<h3>Contributors List ( ${counter} )</h3>`;
    reposContainer.append(h3);
    reposContainer.append(ul);

    box.append(userDetails);
    box.append(reposContainer);

    return box;
}