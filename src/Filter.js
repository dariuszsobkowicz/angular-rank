import $ from "jquery";
import { store, urls } from "./Store";


export const filter = {
    followers:     {
        name: "followers_amount",
        url:  "followers_url"
    },
    repos:         {
        name: "repos_amount",
        url:  "repos_url"
    },
    gists:         {
        name: "gists_amount",
        url:  "gists_url"
    },
    contributions: {
        name: "contributions"
    }
};

export function getQty (filter, callback) {
    let counter = 0;
    const users = store.state.mapUsers;

    if (users[0].hasOwnProperty(filter.name)) {
        return callback()
    }

    users.forEach((user) => {
        $.getJSON(chcekURL(user[filter.url]) + urls.key)
            .then((response) => {
                user[filter.name] = response.length;
                counter++;
                if (users.length === counter) {
                    callback()
                }
            })
    })
}

function chcekURL (url) {
    const regex = /({.+)/g;
    const urlStatus = url.search(regex);
    if ((urlStatus !== -1)) {
        return url.slice(0, urlStatus)
    } else {
        return url
    }
}