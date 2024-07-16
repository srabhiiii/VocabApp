let form = document.querySelector("form");
let res = document.querySelector(".result");
let head1 = document.querySelector(".head1");
let head2 = document.querySelector(".head2");

form.addEventListener("submit", (e) => {
  res.style.padding = "10px";
  res.innerHTML = "Please wait...";
  res.padding = "20px";
  e.preventDefault();
  let w = form.elements[0].value;
  form.elements[0].value = "";
  getinfor(w);
});

const getinfor = async (word) => {
  try {
    const obj = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await obj.json();
    if (data === undefined) {
      res.innerHTML = `<p>sorry we cant get you this</p>`;
    }
    head1.innerHTML = `<h1>📖</h1>`;
    head2.innerHTML = `<strong><h3>WORD :${word.toUpperCase()}</h3></strong>`;

    res.innerHTML = `</br><span><p><strong>Pronounciation :</strong></p><span>
    <audio  class="aud" controls autoplay><source src=${data[0].phonetics[0].audio}></audio>`;

    res.innerHTML += `<br/><p><strong>Part of Speech</strong> :${data[0].meanings[0].partOfSpeech}</p>`;

    res.innerHTML += `<p><strong>Meanings and examples</strong></p><br/>`;
    let n = data[0].meanings[0].definitions.length;

    for (let i = 0; i < n; i++) {
      let def = data[0].meanings[0].definitions[i];
      res.innerHTML += `<p><strong>${i + 1}. </strong>${
        def.definition === undefined ? "Not Found" : def.definition
      }</p>
      <p><strong>Example: </strong>${
        def.example === undefined ? "Not Found" : def.example
      }</p></br></br>`;
    }

    n = data[0].meanings[0].synonyms.length;
    if (n != 0) {
      res.innerHTML += `<p><strong>Synonyms</strong></p>`;
    }

    for (let i = 0; i < n; i++) {
      let def = data[0].meanings[0].synonyms[i];
      res.innerHTML += `<p><strong>${i + 1}. </strong>${
        def === undefined ? "Not Found" : def
      }</p>`;
    }
    res.innerHTML += `<br/>`;

    n = data[0].meanings[0].antonyms.length;
    if (n != 0) {
      res.innerHTML += `<p><strong>Antonyms</strong></p>`;
    }

    for (let i = 0; i < n; i++) {
      let def = data[0].meanings[0].antonyms[i];
      res.innerHTML += `<p><strong>${i + 1}. </strong>${
        def === undefined ? "Not Found" : def
      }</p>`;
    }

    res.innerHTML += `</br><a href="${data[0].sourceUrls}" target="_blank"><button class="learn">Learn More</button></a>`;

    console.log(data);
  } catch (error) {
    res.style.padding = "0px";
    res.innerHTML = "";
    head1.innerHTML = `<h1>😔</h1>`;
    head2.innerHTML = `<strong><h3>Sorry.. we couldnt get that one</h3></strong>`;
  }
};
