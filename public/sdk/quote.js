window.displayQuote = element => {
    element.innerText = "Loading...";

    fetch("https://api.quotable.io/quotes/random").then(res => res.json()).then(quotes => {
        element.innerText = quotes[0].content + "\n- " + quotes[0].author;
    });
}