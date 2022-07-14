function Id(arg){
    return document.getElementById(arg)
}

function Class(arg){
    return document.getElementsByClassName(arg)
}

function Tag(arg){
    return document.getElementsByTagName(arg)
}

function El(arg){
    return document.createElement(arg)
}

function TextNode(arg){
    return document.createTextNode(arg)
}

function Contains(el, arg){
    return el.classList.contains(arg)
}

function Add(elem, args){
    for (let i=0;i<args.length;i++){
        elem.appendChild(args[i])
    }
}

function Classes(elem, arg){

    var arr = arg.split(' ')

    for (let i=0;i<arr.length;i++){
        elem.classList.add(arr[i])
    }
}

function parse(arg) {
    return JSON.parse(arg)
}

function random(arg){
    return Math.random()*arg
}

function floor(arg){
    return Math.floor(arg)
}

function string(arg){
    return JSON.stringify(arg)
}

function round(arg){
    return Math.round(arg)
}

const S = 1000

function buildSet(json){

    let set = new Set(json.id, json.name)

    for (let i=0; i<json.problems.length; i++){
        let p = json.problems[i]
        let prob = new Problem([], [])

        for (let j=0; j<p.strokes.length; j++){
            let s = p.strokes[j]
            let stroke = new Stroke(s.c)
            for (let k=0; k<s.points.length; k++){
                let p = s.points[k]
                let point = new Point(p.x, p.y, p.c)
                stroke.points.push(point)
            }
            prob.strokes.push(stroke)
        }

        for (let j=0; j<p.lines.length; j++){
            let l = p.lines[j]
            let start = new Point(l.start.x, l.start.y, l.start.c)
            let end = new Point(l.end.x, l.end.y, l.end.c)
            let line = new Line(start, end, l.c)
            prob.lines.push(line)
        }
        set.problems.push(prob)
    }
    return set
}

function Search(searchID){
    if (searchID.length == 6 && !isNaN(searchID)){
        window.location.search = 'id=' + searchID
    }
}

function trim(arg){
    return arg.split(" ").join("")
}



