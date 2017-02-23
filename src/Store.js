import $ from "jquery"

export const store = {
    urls:  {
        baseUrl:   "https://api.github.com",
        reposUrl:  "/orgs/angular/repos",
        usersUrls: [],
        key:       "?client_id=ba16a9030ca02977eadd&client_secret=2f47a44c789f7d9838450bfe334846e837cc953d"
    },
    state: {
        reposData: [],
        usersData: [],
    }
};

export function getData (store, callback) {
    $.getJSON(store.urls.baseUrl + store.urls.reposUrl + store.urls.key)
        .then((response) => {
            store.state.reposData = response;
            getContributors(response, store, () => {
                getUserData(store, callback);
            })
        })
}

function getUserData (store, callback) {
    const arr = [];
    let counter = 0;
    store.urls.usersUrls.forEach((url) => $.getJSON(url)
        .then((response) => {
            counter++;
            arr.push(...response);
            if (store.urls.usersUrls.length === counter) {
                store.state.usersData = arr;
                callback()
            }
        })
    );
}

function getContributors (response, store, callback) {
    store.urls.usersUrls = getUsersUrlsFromRepos(response);
    callback()
}

function getUsersUrlsFromRepos (repos) {
    return repos.map((repo) => repo.contributors_url)
}