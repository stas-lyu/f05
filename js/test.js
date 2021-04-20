fetch('dist/catalog.json')
    .then(response =>
        response.json()
    )
    .then(json => {
        console.log(json)
    })