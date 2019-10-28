
function cl (t,part){
let elements = document.querySelectorAll("div.block, div.blockblack");
    Array.prototype.forEach.call(elements, function(el, i){
        el.classList = 'block';
    });
    scroll(part);
    t.classList = 'blockblack';
}

function scroll (part){
    let section1 = document.getElementById(part).getBoundingClientRect();
    window.scrollTo({
        left : section1.left + pageXOffset,
        top : section1.top + pageYOffset,
        behavior: "smooth"
    });
}