import $ from "jquery";
import { renderList } from "./components/list/List";

export const urls = {
    base:  "https://api.github.com",
    repos: "/orgs/angular/repos",
    user:  "/users/",
    key:   "?client_id=ba16a9030ca02977eadd&client_secret=2f47a44c789f7d9838450bfe334846e837cc953d"
};

export const filter = {
    followers:     "followers",
    repos:         "public_repos",
    gists:         "public_gists",
    contributions: "contributions"
};

export let store = {
    state: {
        repos:         [],
        mapReposUsers: {},
        mapReposName:  {},
        users:         {},
        mapUsers:      []
    }
};

export function dispatchData (callback) {

    const loadStore = window.localStorage.getItem("store");

    if (loadStore !== null) {
        store = JSON.parse(loadStore);
        renderList();
    } else {
        $("#root").append($("<h2 class='loading'>Loading data...</h2>"));
        collectData(urls, store, function () {
            callback();
        });
    }
}

export function fetchDetailsForFilters (users, callback) {
    let counter = 0;

    users.forEach((user) => {
        $.getJSON(user.url + urls.key)
            .then((response) => {
                user = Object.assign(user, response);
                counter++;
                if (users.length === counter) {
                    callback();
                }
            });
    });
}

function collectData (urls, store, callback) {
    $.getJSON(urls.base + urls.repos + urls.key)
        .then((repos) => {
            store.state.repos = repos;
            store.state.mapReposName = store.state.repos.reduce((map, repos) => {
                map[repos.name] = repos;
                return map;
            }, {});
            getUsers(repos, store, () => {
                store.state.mapUsers = Object.keys(store.state.users).map(key => store.state.users[key]);
                store.state.mapUsers.sort((a, b) => b.contributions - a.contributions);

                createRepoUsers(store.state.mapUsers, store.state.mapReposUsers);

                fetchDetailsForFilters(store.state.mapUsers, function () {
                    console.log("READY");
                    callback();
                });


            });
        });
}

function createRepoUsers (users, repos) {
    users.forEach((user) => {
        user.contributed_repos.forEach((elem) => {
            for (let key in repos) {
                if (key === elem) {
                    if (repos.hasOwnProperty(key)) {
                        if (repos[key].indexOf(elem) === -1) {
                            repos[key].push(user);
                        }
                    }
                }
            }
        });
    });
}

function getData (urls) {
    const dfd = new $.Deferred();
    let counter = 0;
    const arr = [];

    urls.forEach((url) => {
        $.getJSON(url).then((response) => {

            assignRepoToUser(url, response);

            counter++;
            arr.push(...response);
            if (urls.length === counter) {
                dfd.resolve(arr);
            }
        });
    });

    return dfd;
}

function assignRepoToUser (url, response) {
    let name = "";
    const prop = "contributed_repos";

    name = url.slice(url.indexOf("angular/") + 8);
    name = name.slice(0, name.indexOf("/contributors"));

    store.state.mapReposUsers[name] = [];

    response.forEach((res) => {
        res[prop] = [name];
    });
}

function getUsers (repos, store, callback) {
    const urls = getUrls(repos);

    $.when(getData(urls)).then(function (users) {
        let counter = 0;
        users.forEach((user) => {

            if (!(store.state.users.hasOwnProperty(user.login))) {
                store.state.users[user.login] = user;
            } else {
                store.state.users[user.login].contributions += user.contributions;
                store.state.users[user.login].contributed_repos.push(...user.contributed_repos);
            }
            counter++;
            if (users.length === counter) {
                callback();
            }
        });
    });
}

function getUrls (repos) {
    return repos.map((repo) => repo.contributors_url + urls.key);
}