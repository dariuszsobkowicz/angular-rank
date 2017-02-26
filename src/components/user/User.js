import $ from "jquery";
import { renderRepo } from "../repo/Repo";

export function renderUser (data) {
    const user = data.data("user");
    cleanContainer();
    const template = userTemplate(user);
    $("#root").append(template);
    $(".repo").on("click", function () {
        renderRepo(this)
    })
}

export function cleanContainer () {
    $("#root").empty();
}

function userTemplate (user) {
    const container = $("<div></div>");
    const ul = $("<ul></ul>");

    const reposList = user.contributed_repos.map((elem) => `<li class="repo" data-name=${elem}>${elem}</li>`);
    const details = `<div>
                        <h2>${user.name}</h2>
                     </div>`;

    container.append(details);
    container.append(reposList);

    return container
}
