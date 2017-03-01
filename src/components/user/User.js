import $ from "jquery";
import { renderRepo } from "../repo/Repo";

export function renderUser (user) {
    const container = $(".lightbox-container");
    cleanContainer();

    container.append($("<div class='lightbox'></div>"));

    const frame = userTemplate(user);

    container.prepend($("<div class='close'>CLOSE</div>"));
    const lightbox = $(".lightbox");
    lightbox.append(frame);

    $(".box-list").on("click", "li a", function (e) {
        e.stopImmediatePropagation();
        const that = $(this);
        const repo = that.data("name");
        renderRepo(repo);
    });
    $(".close").on("click", function () {
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

function userTemplate (user) {
    const box = $("<div class='box-frame'></div>");
    const userName = user.name === null ? user.login : user.name;
    const contributions = user.contributions === 0 ? "zero" : user.contributions;
    const followers = user.followers === 0 ? "zero" : user.followers;
    const public_gists = user.public_gists === 0 ? "zero" : user.public_gists;
    const public_repos = user.public_repos === 0 ? "zero" : user.public_repos;

    const userDetails = `<div class="box-details">
                            <div class="box-details-header">
                                <div><img src=${user.avatar_url} alt="Username" class="img-fluid img-box"></div>
                                <div><h2>${userName}</h2></div>
                            </div>
                            <ul>
                                <li class="box-details-item">Contributions <span class="box-details-number">${contributions}</span></li>
                                <li class="box-details-item">Followers <span class="box-details-number">${followers}</span></li>
                                <li class="box-details-item">Public gists <span class="box-details-number">${public_gists}</span></li>
                                <li class="box-details-item">Public repos <span class="box-details-number">${public_repos}</span></li>
                            </ul>
                         </div>`;

    const reposContainer = $("<div class='box-list'><h3>Repos List</h3></div>");
    const reposList = user.contributed_repos.map((elem) => {
        return `<li class="box-list-item"><a href="#" data-name=${elem}>${elem}</a></li>`
    });
    const ul = $("<ul class='box-list-columns'></ul>");
    ul.append(reposList);
    reposContainer.append(ul);

    box.append(userDetails);
    box.append(reposContainer);

    return box;
}

export function cleanContainer () {
    $(".lightbox").remove();
    $(".close").remove();
}
