let str = ''

for (let i = 0; i < DATA.length; i++){
    let sec = DATA[i]

    str +=
        `
        <div class = 'sec'>
            <div class = 'header'>
                <h1> ${sec.title} </h1>
                <h2> ${sec.blurb} </h2>
            </div>
            <div class = 'items'>
        `

    for (let j = 0; j < sec.items.length; j++){
        let item = sec.items[j]
        str +=
        `
          <a href = '${item.href}'>
            <div class = 'item'>
                <div class = 'img' style = 'background-image: url(assets/${item.img}.png)'></div>
                <div class = 'expo'>
                    <div class = 'name'>
                        <h1>
                            ${item.name}
                        </h1>
                   `
        if (item.active) str += `<span class="material-icons"> cloud_done </span>`
        str +=
            `
                        </div>
                        <p> ${item.blurb} </p>
                    </div>
                </div>
            </a>
            `
    }
    str += `</div> </div>`
}

Id('main').innerHTML = str