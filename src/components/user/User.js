import $ from "jquery";
import { renderRepo } from "../repo/Repo";

export function renderUser (user) {
    cleanContainer();

    const frame = userTemplate(user);

    $(".lightbox").append(frame);

    $(".box-list").on("click", "li", function (e) {
        e.stopImmediatePropagation();
        const that = $(this);
        const repo = that.data("name");
        renderRepo(repo);
    })

}

function userTemplate (user) {
    const box = $("<div class='box-frame'></div>");
    const userName = user.name === null ? user.login : user.name;

    const userDetails = `<div class="box-details">
                            <h2>${userName}</h2>
                            <ul>
                                <li class="box-details-item">Contributions <span class="box-details-number">${user.contributions}</span></li>
                                <li class="box-details-item">Followers <span class="box-details-number">${user.followers}</span></li>
                                <li class="box-details-item">Public gists <span class="box-details-number">${user.public_gists}</span></li>
                                <li class="box-details-item">Public repos <span class="box-details-number">${user.public_repos}</span></li>
                            </ul>
                         </div>`;

    const reposContainer = $("<div class='box-list'><ul><h3>Repos</h3></ul></div>");
    const reposList = user.contributed_repos.map((elem) => `<li class="box-list-item" data-name=${elem}>${elem}</li>`);
    reposContainer.append(reposList);

    box.append(userDetails);
    box.append(reposContainer);

    return box;
}

export function cleanContainer () {
    $(".lightbox").empty();
}
