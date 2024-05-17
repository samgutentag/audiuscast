import "./bootstrap";

import {
    DiscoveryNodeSelector,
    EntityManager,
    sdk,
    stagingConfig,
} from "@audius/sdk";

const discoveryNodeSelector = new DiscoveryNodeSelector({
    initialSelectedNode: "https://discoveryprovider.staging.audius.co/",
});
let appName = "AudiusCast_Staging";
if (import.meta.env.VITE_AUDIUS_ENV === "production") {
    appName = "AudiusCast";
}
let sdkConfig = {
    appName: appName,
    apiKey: import.meta.env.VITE_AUDIUS_API_KEY,
};
if (import.meta.env.VITE_AUDIUS_ENV === "staging") {
    sdkConfig.services = {
        discoveryNodeSelector,
        entityManager: new EntityManager({
            discoveryNodeSelector,
            web3ProviderUrl: stagingConfig.web3ProviderUrl,
            contractAddress: stagingConfig.entityManagerContractAddress,
            identityServiceUrl: stagingConfig.identityServiceUrl,
        }),
    };
}
const audiusSdk = sdk(sdkConfig);
const oauthConfig = {
    successCallback: (res) => {
        window.axios
            .post("/auth/login", {
                email: res.email,
                audius_handle: res.handle,
                audius_id: res.userId,
                avatar_url: res.profilePicture["_1000x1000"],
            })
            .then((response) => {
                window.location.href = "/dashboard";
            });
    },
};
if (import.meta.env.VITE_AUDIUS_ENV === "staging") {
    oauthConfig.env = "staging";
}
audiusSdk.oauth.init(oauthConfig);
audiusSdk.oauth.renderButton({
    element: document.getElementById("audius-login-button"),
    scope: "write",
    fullWidth: true,
    size: "large",
});

const contentDiv = document.getElementById("content-div");
const placeholder = document.getElementById("placeholder");
const nav = document.getElementById("nav-element");

function moveDiv() {
    if (window.innerWidth < 640) {
        // Tailwind 'sm' breakpoint
        if (contentDiv.parentElement !== placeholder) {
            placeholder.appendChild(contentDiv);
            placeholder.classList.remove("hidden-placeholder");
        }
    } else {
        if (contentDiv.parentElement !== nav) {
            // nav.insertBefore(contentDiv, nav.firstChild);
            nav.appendChild(contentDiv, nav.firstChild);
            placeholder.classList.add("hidden-placeholder");
        }
    }
}

window.addEventListener("resize", moveDiv);
window.addEventListener("DOMContentLoaded", moveDiv);
