const filtered = []
const dataFiltered = () => {
    allPosts.post.forEach((elemento, i, array) => {
        if (elemento.title.includes(search)) {
            filtered.push(elemento)
        }
    })
}
