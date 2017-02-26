import $ from "jquery";
import { store } from "./Store";

export function renderRepo (elem) {
    const root = $("#root");
    let users = [];
    let repo = [];

    for (let key in store.state.mapReposUsers) {
        if (key === elem.dataset.name) {
            users = [...store.state.mapReposUsers[key]]
        }
    }

    for (let key in store.state.mapReposName) {
        if (key === elem.dataset.name) {
            repo = store.state.mapReposName[key]
        }
    }
    console.log(users);
    console.log(repo);
    const template = createTemplate(repo, users);
    root.empty();
    root.append(template)

}

function createTemplate (repo, users) {
    const container = $("<div></div>");
    const ul = $("<ul></ul>");
    const list = users.map((user) => `<li>${user.login}</li>`);
    const details = `<div>
                        <h2>${repo.full_name}</h2>       
                     </div>`;

    ul.append(list);
    container.append(details);
    container.append(ul);
    return container
}