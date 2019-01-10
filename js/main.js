console.log("init main");
// alert('main');
window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  // console.log("all event - inner html: ", event.origin,  event);

  if (
    event.origin !== "https://davojta-test-google-auth.github.io" &&
    event.origin !== "http://127.0.0.1:8080" &&
    event.origin !== 'chrome-extension://fliamllfljamnbcapfbmcgddafjjjaid'
  )
    return;

  console.log("after check - inner html: ", event.origin, event);

  if (event.data === "getAccessToken") {
    var user = gapi.auth2.getAuthInstance().currentUser.get();
    var oauthToken = user.getAuthResponse().access_token;

    console.log("oauthToken", oauthToken);
    event.source.postMessage(
      {
        type: "answer",
        commandName: "getAccessToken",
        payload: oauthToken
      },
      event.origin
    );
  }

  // event.source.postMessage("answer_from_iframe", event.origin);

  // ...
}

// setTimeout(() => {
//     window.postMessage('')
// }, 5000);
