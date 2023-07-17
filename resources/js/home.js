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

const audiusSdk = sdk({
    appName: "AudiusCast_Staging",
    services: {
        discoveryNodeSelector,
        entityManager: new EntityManager({
            discoveryNodeSelector,
            web3ProviderUrl: stagingConfig.web3ProviderUrl,
            contractAddress: stagingConfig.entityManagerContractAddress,
            identityServiceUrl: stagingConfig.identityServiceUrl,
        }),
    },
    apiKey: "b6fd9c0350e052d7af5b9d2895c6481554d57999",
    apiSecret: "",
});

audiusSdk.oauth.init({
    successCallback: (res) => {
        console.log("Log in success!", res);
        window.axios
            .post("/auth/login", {
                email: res.email,
                audius_handle: res.handle,
                audius_id: res.userId,
            })
            .then((response) => {
                window.location.href = "/dashboard";
            });
    },
    env: "staging",
});

audiusSdk.oauth.renderButton({
    element: document.getElementById("audius-login-button"),
    scope: "write",
});
