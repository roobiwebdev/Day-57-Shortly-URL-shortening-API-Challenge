document.getElementById("shortActBtn").addEventListener("click", async () => {
  try {
    const url = document.getElementById("link").value;
    const newLinksUl = document.querySelector(".shortend");
    const response = await fetch(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`
    );
    if (response.ok) {
      const data = await response.text();
      const newLink = document.createElement("div");
      newLink.innerHTML = `
          <div class="shortendLinks">
              <p class="givin-link">${url}</p>
              <div class="short-link">
              <p class="newLink"><a href="${data}" id="nLink" target="_blank">${data}</a></p>
              <button class="copy">Copy</button>
              </div>
          </div> 
          `;
      newLinksUl.appendChild(newLink);

      newLink.querySelector(".copy").addEventListener("click", () => {
        const nLink = document.querySelector("#nLink");
        const range = document.createRange();
        range.selectNode(nLink);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
      });
    } else {
      document.querySelector("#link").style.border = "1px solid red";
      document.querySelector(".error").textContent = "please add a valid link";
    }
  } catch (error) {
    console.log(error);
    document.querySelector("#link").style.border = "1px solid red";
    document.querySelector(".error").textContent = "please add a valid link";
  }
});
