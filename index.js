import { ScrollTriggeredAnimation } from "./scroll-triggered-animations.js"


/**
 * Two types of animation:
 *  1) Scroll triggerd animations - animation starts once element is scrolled into view - also undo animation once user scroll back aboth element (see aos library)
 *  2) Scroll controlled animation - move element with scroll of user (see webC website)
 */


let scroll_triggered_animations = []
//Init Animations
window.addEventListener("DOMContentLoaded",()=>{

    //find all objects that need to be animated with an scroll_triggered animation
    let objects = u(".animation.scroll-triggered")

    //for every object add a animation to the scroll_triggeded_animations variable
    objects.each((node)=>{
        scroll_triggered_animations.push(new ScrollTriggeredAnimation(node))
    })


    window.addEventListener("scroll",scroll_event_handler)
})
// 1) Scroll triggerd animation
function scroll_event_handler(){
    //let documentHeightAnchorBottom = document.body.scrollHeight
    //let documentHeightAnchorTop = document.body.scrollHeight - window.visualViewport.height
    //let scrollYAnchorTop = window.scrollY //offset from the top of the document to the highest visible pixel
    let scrollYAnchorBottom = window.scrollY + window.visualViewport.height //offset from the bottom of the document to the lowest visible pixel

    scroll_triggered_animations.map(animation=>{
        animation.checkEvents(scrollYAnchorBottom)
    })
}
