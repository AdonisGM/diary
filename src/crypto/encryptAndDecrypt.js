const GenerateKey = async () => {
  // ---------------------------- generate key -----------------------------
  const key = await window.crypto.subtle.generateKey(
    {
      name: "AES-CTR",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  );

  const objKey = await window.crypto.subtle.exportKey(
    'jwk',
    key
  );

  const fingerprint = window.crypto.randomUUID();

  const username = localStorage.getItem('username');

  localStorage.setItem(`key-${username}`, JSON.stringify([{
    key: objKey,
    fingerprint: fingerprint,
    isDefault: true,
  }]));

  return { key, fingerprint };
}

const Encrypt = async (rawString) => {
  // ---------------------------- encrypt -----------------------------
  const enc = new TextEncoder();
  const encoded = enc.encode(rawString);
  const counter = window.crypto.getRandomValues(new Uint8Array(16));

  // convert counter to string
  const counterStr = Array.from(counter).join(':');

  const username = localStorage.getItem('username');
  const objKey = JSON.parse(localStorage.getItem(`key-${username}`)).find(key => key.isDefault);
  const key = await window.crypto.subtle.importKey(
    'jwk',
    objKey.key,
    {
      name: "AES-CTR",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );

  const resultEncode = await window.crypto.subtle.encrypt(
    {
      name: "AES-CTR",
      counter,
      length: 64,
    },
    key,
    encoded,
  );

  return {
    resultEncode: String.fromCharCode.apply(null, new Uint8Array(resultEncode)),
    counter: counterStr,
    fingerprint: objKey.fingerprint,
  }
}

const Decrypt = async (strResultEncode, counter, fingerprint) => {
  // ---------------------------- decrypt -----------------------------
  const buf = new ArrayBuffer(strResultEncode.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = strResultEncode.length; i < strLen; i++) {
    bufView[i] = strResultEncode.charCodeAt(i);
  }

  const username = localStorage.getItem('username');
  const objKey = JSON.parse(localStorage.getItem(`key-${username}`)).find(key => key.fingerprint === fingerprint).key;
  const key = await window.crypto.subtle.importKey(
    'jwk',
    objKey,
    {
      name: "AES-CTR",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );

  const counterBufView = new Uint8Array(counter.split(':').map((number) => {
    return parseInt(number);
  }));

  const result = await window.crypto.subtle.decrypt(
    { name: "AES-CTR", counter: counterBufView, length: 64 }
    , key, bufView);

  return String.fromCharCode.apply(null, new Uint8Array(result));
}

export {
  GenerateKey,
  Encrypt,
  Decrypt
}