const getSanityImageUrl = (imageRef) => {
    const baseUrl = "https://cdn.sanity.io/images/tqrkx4qu/production/"
    let processedString = imageRef.replace("image-", "")
    const lastIndex = processedString.lastIndexOf("-")
    if (lastIndex !== -1) {
        processedString = processedString.substring(0, lastIndex) + "." + processedString.substring(lastIndex + 1)
    }

    return baseUrl + processedString
}

const initTipsPage = async () => {
    const QUERY = `*[_type == "category" && slug.current == "tips"][0]{ title, "articles": *[_type == "article" && references(^._id)] }`
    const res = await fetch(`https://tqrkx4qu.apicdn.sanity.io/v2022-03-07/data/query/production?query=${encodeURIComponent(QUERY)}`)
    const data = await res.json()
    data.result.articles.forEach(article => {
        document.querySelector(".tips-row").innerHTML += `
            <div class="tips-card">
                <div class="img-container">
                    <img src=${getSanityImageUrl(article.image.asset._ref)} alt="">
                </div>
                <h2>${article.title}</h2>
                <p>${article.description}</p>
                <a href="./article/?slug=${article.slug.current}">Know more</a>
            </div>
        `
    })
}

initTipsPage()
