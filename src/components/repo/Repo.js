import $ from "jquery";
import { store } from "../../Store";
import { renderUser, cleanContainer } from "../user/User";

export function renderRepo (name) {
    const container = $(".lightbox-container");
    let users = [];
    let repo = [];

    for (let key in store.state.mapReposUsers) {
        if (store.state.mapReposUsers.hasOwnProperty(key)) {
            if (key === name) {
                users = [...store.state.mapReposUsers[key]]
            }
        }
    }

    for (let key in store.state.mapReposName) {
        if (store.state.mapReposName.hasOwnProperty(key)) {
            if (key === name) {
                repo = store.state.mapReposName[key]
            }
        }
    }

    cleanContainer();
    container.append($("<div class='lightbox'></div>"));

    const frame = repoTemplate(repo, users);
    container.prepend($("<div class='close'>CLOSE</div>"));
    const lightbox = $(".lightbox");
    lightbox.append(frame);

    $(".box-list").on("click", "li a", function (e) {
        e.stopImmediatePropagation();
        const that = $(this);
        const user = that.data("user");
        renderUser(user);
    });
    $(".close").on("click", function (e) {
        $(".lightbox-container").hide();
        cleanContainer();
        $("body").css({
            "position": "relative"
        });
    });
    container.on("click", function (e) {
        $(".lightbox-container").hide();
        cleanContainer();
        $("body").css({
            "position": "relative"
        });
    });
    lightbox.on("click", function (e) {
        e.stopImmediatePropagation();
    });
}

function repoTemplate (repo, users) {
    const box = $("<div class='box-frame'></div>");
    const forks = repo.forks === 0 ? "zero" : repo.forks;
    const watchers = repo.watchers === 0 ? "zero" : repo.watchers;
    let counter = 0;

    const userDetails = `<div class="box-details">
                            <h2>Repo: ${repo.name}</h2>
                            <ul>
                                <li class="box-details-item">Forks <span class="box-details-number">${repo.forks}</span></li>
                                <li class="box-details-item">Watchers <span class="box-details-number">${repo.watchers}</span></li>
                            </ul>
                         </div>`;

    const reposContainer = $("<div class='box-list'></div>");
    const ul = $("<ul class='box-list-columns'></ul>");
    const reposList = users.map((user) => {
        counter++;
        const name = user.name === null ? user.login : user.name;
        const elem = $("<li class='box-list-item'></li>");
        const link = $("<a href='#' class='repo-name'></a>");
        link.data("user", user);
        link.text(name);
        elem.append(link);
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