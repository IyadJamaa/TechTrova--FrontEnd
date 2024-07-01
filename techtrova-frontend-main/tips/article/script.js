const getTagName = (style) => {
    const tagNames = {
        "normal": "p"
    }

    return tagNames[style] || style
}

const toFormattedElement = (child) => {
    let html = `<${child._type}>`

    for (let i = 0; i < child.marks.length; i++) {
        html += `<${child.marks[i]}>`
    }

    html += child.text

    for (let i = child.marks.length - 1; i >= 0; i--) {
        html += `</${child.marks[i]}>`
    }

    html += `</${child._type}>`

    return html
}

function toHTML(blocks = []) {
    return blocks
        .map(block => {
            if (block._type !== 'block' || !block.children) {
                return ''
            }

            let html = `<${getTagName(block.style)}>`
            html += block.children.map(child => toFormattedElement(child)).join('')
            html += `</${getTagName(block.style)}>`

            return html
        })
        .join('\n\n')
}

const initArticlePage = async () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const slug = urlParams.get('slug')
    const QUERY = `*[_type == "article" && slug.current == "${slug}"][0]`
    const res = await fetch(`https://tqrkx4qu.apicdn.sanity.io/v2022-03-07/data/query/production?query=${encodeURIComponent(QUERY)}`)
    const data = await res.json()
    console.log({ data })
    document.querySelector(".article-title").textContent = data.result.title
    document.querySelector(".article-description").textContent = data.result.description
    document.querySelector(".article-content").innerHTML = toHTML(data.result.content)
}

initArticlePage()
