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
    const contributions = user.contributions === 0 ? "zero" : user.contributions;
    const followers = user.followers === 0 ? "zero" : user.followers;
    const public_gists = user.public_gists === 0 ? "zero" : user.public_gists;
    const public_repos = user.public_repos === 0 ? "zero" : user.public_repos;
    let counter = 0;

    const userDetails = `<div class="box-details">
                            <h2>${userName}</h2>
                            <ul>
                                <li class="box-details-item">Contributions <span class="box-details-number">${contributions}</span></li>
                                <li class="box-details-item">Followers <span class="box-details-number">${followers}</span></li>
                                <li class="box-details-item">Public gists <span class="box-details-number">${public_gists}</span></li>
                                <li class="box-details-item">Public repos <span class="box-details-number">${public_repos}</span></li>
                            </ul>
                         </div>`;

    const reposContainer = $("<div class='box-list'><h3>Repos List</h3></div>");
    const reposList = user.contributed_repos.map((elem) => {
        counter++;
        counter = counter < 10 ? "0" + counter : counter;
        return `<li class="box-list-item" data-name=${elem}><span class="counter">${counter}.</span> <span class="repo-name">${elem}</span></li>`
    });
    const ul = $("<ul></ul>");
    ul.append(reposList);
    reposContainer.append(ul);

    box.append(userDetails);
    box.append(reposContainer);

    return box;
}

export function cleanContainer () {
    $(".lightbox").empty();
}
