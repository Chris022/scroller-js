/**
 * Two types of animation:
 *  1) Scroll triggerd animations - animation starts once element is scrolled into view - also undo animation once user scroll back aboth element (see aos library)
 *  2) Scroll controlled animation - move element with scroll of user (see webC website)
 */

// 1) Scroll triggerd animation
window.addEventListener("scroll",()=>{

    let documentHeightAnchorBottom = document.body.scrollHeight
    let documentHeightAnchorTop = document.body.scrollHeight - window.visualViewport.height
    let scrollYAnchorTop = window.scrollY //offset from the top of the document to the highest visible pixel
    let scrollYAnchorBottom = window.scrollY + window.visualViewport.height //offset from the bottom of the document to the lowest visible pixel


    let object = u("#object")

    let objectPosYAnchorTop = object.size().top + window.scrollY
    let objectPosYAnchorBottom = object.size().top + window.scrollY + object.size().height

    let hasNotYetViewportReachedElement = scrollYAnchorBottom < objectPosYAnchorTop
    let hasViewportReachedElement = scrollYAnchorBottom >= objectPosYAnchorTop

    if(scrollYAnchorBottom < objectPosYAnchorTop){
        console.log("viewport not yet reached object")
    }else{
        console.log("viewport reached object")
    }

    //console.log(objectYAnchorBottom)
    //console.log(scrollYAnchorBottom)
})