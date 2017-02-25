import $ from "jquery"

export const urls = {
    base:  "https://api.github.com",
    repos: "/orgs/angular/repos",
    key:   "?client_id=ba16a9030ca02977eadd&client_secret=2f47a44c789f7d9838450bfe334846e837cc953d"
};

export const store = {
    state: {
        repos:    [],
        users:    {},
        mapUsers: []
    }
};

export function dispatchData (callback) {
    collectData(urls, store, function () {
        callback()
    });
}

function collectData (urls, store, callback) {
    $.getJSON(urls.base + urls.repos + urls.key)
        .then((repos) => {
            store.state.repos = repos;
            getUsers(repos, store, () => {
                store.state.mapUsers = Object.keys(store.state.users).map(key => store.state.users[key]);
                store.state.mapUsers.sort((a, b) => b.contributions - a.contributions);
                callback();
            })
        })
}

function getData (urls) {
    const dfd = new $.Deferred();
    let counter = 0;
    const arr = [];

    urls.forEach((url) => {
        $.getJSON(url).then((response) => {
            counter++;
            arr.push(...response);
            if (urls.length === counter) {
                dfd.resolve(arr)
            }
        })
    });

    return dfd
}

function getUsers (repos, store, callback) {
    const urls = getUrls(repos);

    $.when(getData(urls)).then(function (users) {
        users.forEach((user) => {
            if (!(store.state.users.hasOwnProperty(user.login))) {
                store.state.users[user.login] = user
            } else {
                store.state.users[user.login].contributions += user.contributions
            }
        });
        callback()
    });
}

function getUrls (repos) {
    return repos.map((repo) => repo.contributors_url + urls.key)
}