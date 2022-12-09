import credentialsSchema from "../Models/credentialsSchema.js";

export const newCredentials = async (shopData, session) => {
    const credentialData = {
        shop: shopData.session.shop,
        name: shopData.name,
        email: shopData.email,
        domain: shopData.domain,
        phone: shopData.phone,
        accessToken: shopData.session.accessToken,
        timezone: shopData.timezone,
        shop_owner: shopData.shop_owner,
        money_format: shopData.money_format,
        currency: shopData.currency,
        city: shopData.city,
        zip: shopData.zip,
        country_name: shopData.country_name,
        country_code: shopData.country_code,
        appStatus: "installed"
    }
    // console.log("credentialData",credentialData );

    const shopExists = await credentialsSchema.findOne({ shop: credentialData.shop })
    if (shopExists && shopExists.accessToken !== credentialData.accessToken) {
        const updateAccessToken = await credentialsSchema.findOneAndUpdate({ shop: shopExists.shop }, { accessToken: credentialData.accessToken });
        console.log("Access token updated", updateAccessToken);
    }
    if (shopExists == null) {
        await credentialsSchema.create(credentialData);
    } else {
        console.log("Shop exists");
    }

}