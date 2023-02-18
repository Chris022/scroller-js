import { ScrollTriggeredAnimation } from "./scroll-triggered-animation.js"
import { ScrollControlledAnimation } from "./scroll-controlled-animation.js"

/**
 * Two types of animation:
 *  1) Scroll triggerd animations - animation starts once element is scrolled into view - also undo animation once user scroll back aboth element (see aos library)
 *  2) Scroll controlled animation - move element with scroll of user (see webC website)
 */


let scroll_triggered_animations = []
let scroll_controlled_animations = []


//Init Animations
window.addEventListener("DOMContentLoaded",()=>{

    //find all objects that need to be animated
    let scroll_triggered_objects = u(".animation.scroll-triggered")
    let scroll_controlled_objects = u(".animation.scroll-controlled")

    //for every object add a animation to the scroll_triggeded_animations variable
    scroll_triggered_objects.each((node)=>{
        scroll_triggered_animations.push(new ScrollTriggeredAnimation(node))
    })

    //for every object add a animation to the scroll_controlled_animations variable
    scroll_controlled_objects.each((node)=>{
        scroll_controlled_animations.push(new ScrollControlledAnimation(node))
    })


    window.addEventListener("scroll",scroll_event_handler)
})


function scroll_event_handler(){
    //let documentHeightAnchorBottom = document.body.scrollHeight
    //let documentHeightAnchorTop = document.body.scrollHeight - window.visualViewport.height
    //let scrollYAnchorTop = window.scrollY //offset from the top of the document to the highest visible pixel
    let scrollYAnchorBottom = window.scrollY + window.visualViewport.height //offset from the bottom of the document to the lowest visible pixel

    scroll_triggered_animations.map(animation=>{
        animation.checkEvents(scrollYAnchorBottom)
    })

    scroll_controlled_animations.map(animation=>{
        animation.checkEvents(scrollYAnchorBottom)
    })
}
