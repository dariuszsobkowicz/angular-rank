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
        //console.log(user)
    });
}

function repoTemplate (repo, users) {
    const box = $("<div class='box-frame'></div>");

    const userDetails = `<div class="box-details">
                            <h2>${repo.name}</h2>
                            <ul>
                                <li class="box-details-item">Forks <span class="box-details-number">${repo.forks}</span></li>
                                <li class="box-details-item">Watchers <span class="box-details-number">${repo.watchers}</span></li>
                            </ul>
                         </div>`;

    const reposContainer = $("<div class='box-list'><ul><h3>Contributors</h3></ul></div>");
    const reposList = users.map((user) => {
        const name = user.name === null ? user.login : user.name;
        const elem = $("<li class='box-list-item'></li>");
        elem.data("user", user);
        elem.text(name);
        return elem;
    });
    reposContainer.append(reposList);

    box.append(userDetails);
    box.append(reposContainer);

    return box;
}