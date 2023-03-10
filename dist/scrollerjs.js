//Function stolen from https://easings.net/
function $e81a113864fe77bb$export$7d409c700005d9a9(x) {
    const c5 = 2 * Math.PI / 4.5;
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2 : Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5) / 2 + 1;
}
function $e81a113864fe77bb$export$45db2fc2f15997e7(x) {
    return x;
}
function $e81a113864fe77bb$export$1157fb72e7fbceb5(x) {
    return 1 - Math.pow(1 - x, 3);
}
function $e81a113864fe77bb$export$24656b269d8df7d6(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
function $e81a113864fe77bb$export$fb9e4320a4025f10(x) {
    return 1 - Math.pow(1 - x, 4);
}
function $e81a113864fe77bb$export$bd93209e120f4915(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}
function $e81a113864fe77bb$export$5da70c9577229d30(x) {
    return x * x * x;
}
function $e81a113864fe77bb$export$c3d8280971f5e7ab(x) {
    return x * x * x * x;
}
function $e81a113864fe77bb$export$fe4a60940f66e545(x) {
    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
}
function $e81a113864fe77bb$export$7895717e81685a1a(x) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return x < 0.5 ? Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}
function $e81a113864fe77bb$export$1d83bcb8568cb53c(x) {
    const c4 = 2 * Math.PI / 3;
    return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}
function $e81a113864fe77bb$export$1f36003cbba0aa13(x) {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (x < 1 / d1) return n1 * x * x;
    else if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75;
    else if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375;
    else return n1 * (x -= 2.625 / d1) * x + 0.984375;
}
var $e81a113864fe77bb$export$2e2bcd8739ae039 = {
    "linear": $e81a113864fe77bb$export$45db2fc2f15997e7,
    "easeOutBounce": $e81a113864fe77bb$export$1f36003cbba0aa13,
    "easeOutElastic": $e81a113864fe77bb$export$1d83bcb8568cb53c,
    "easeInOutBack": $e81a113864fe77bb$export$7895717e81685a1a,
    "easeInExpo": $e81a113864fe77bb$export$fe4a60940f66e545,
    "easeInQuart": $e81a113864fe77bb$export$c3d8280971f5e7ab,
    "easeInCubic": $e81a113864fe77bb$export$5da70c9577229d30,
    "easeInOutQuart": $e81a113864fe77bb$export$bd93209e120f4915,
    "easeOutQuart": $e81a113864fe77bb$export$fb9e4320a4025f10,
    "easeInOutCubic": $e81a113864fe77bb$export$24656b269d8df7d6,
    "easeOutCubic": $e81a113864fe77bb$export$1157fb72e7fbceb5,
    "easeInOutElastic": $e81a113864fe77bb$export$7d409c700005d9a9
};


function $c7be1fc6c13f9027$export$70981bf34b85c1b0(element, slug) {
    return [
        (name, default_val, numeric = false)=>(numeric ? parseFloat(u(element).data(slug + "-" + name)) : u(element).data(slug + "-" + name)) || default_val,
        (name, numeric = false)=>{
            if (!u(element).data(slug + "-" + name)) throw new Error("Animation Object missing data attribute: " + slug + "-" + name);
            if (numeric) return parseFloat(u(element).data(slug + "-" + name));
            return u(element).data(slug + "-" + name);
        }
    ];
}


class $0a2e60d6efdd78ff$export$f5804c2eff459bff {
    constructor(element){
        this.element = element;
        //Get Animations via data- attributes
        let [getDataDefault, getDataError] = (0, $c7be1fc6c13f9027$export$70981bf34b85c1b0)(this.element, "animation");
        this.animated_css = getDataError("css");
        this.animated_css_func = getDataDefault("css-func", "");
        this.keyframe_from = getDataError("keyframe-from", true);
        this.keyframe_to = getDataError("keyframe-to", true);
        this.unit = getDataDefault("unit", "");
        this.offset = getDataDefault("offset", 0, true);
        this.forward_duration = getDataError("forward-duration", true);
        this.forward_animation_function = getDataError("forward-function");
        this.backward_duration = getDataDefault("backward-duration", this.forward_duration, true);
        this.backward_animation_function = getDataDefault("backward-function", this.forward_animation_function);
        //process attributes
        this.forward_animation_function = (0, $e81a113864fe77bb$export$2e2bcd8739ae039)[this.forward_animation_function];
        this.backward_animation_function = (0, $e81a113864fe77bb$export$2e2bcd8739ae039)[this.backward_animation_function];
        //set default values
        this.playing = false;
        this.direction = "forwards";
        this.forward_interval = null;
        this.backward_interval = null;
        //start by setting the animated css value to the "keyframe-from" position
        if (this.animated_css_func) this.element.style[this.animated_css] = this.animated_css_func + "(" + this.keyframe_from + this.unit + ")";
        else this.element.style[this.animated_css] = this.keyframe_from + this.unit;
    }
    playBackwards() {
        if (this.direction == "forwards" && this.playing == true) {
            window.clearInterval(this.forward_interval);
            //this.element.style.transform = this.default_transform
            this.playing = false;
            this.direction = "backwards";
        }
        if (this.playing == true) return;
        if (this.direction != "backwards") return;
        this.playing = true;
        let counter = this.backward_duration;
        this.backward_interval = window.setInterval(()=>{
            let stretched_animation_function = (counter)=>this.keyframe_from + this.backward_animation_function(counter) * (this.keyframe_to - this.keyframe_from);
            let value = stretched_animation_function(counter / this.backward_duration);
            if (this.animated_css_func) this.element.style[this.animated_css] = this.animated_css_func + "(" + value + this.unit + ")";
            else this.element.style[this.animated_css] = value + this.unit;
            if (counter <= 0) {
                window.clearInterval(this.backward_interval);
                //this.element.style.transform = this.default_transform
                this.playing = false;
                this.direction = "forwards";
            }
            counter -= 10;
        }, 10);
    }
    playForwards() {
        if (this.direction == "backwards" && this.playing == true) {
            window.clearInterval(this.backward_interval);
            //this.element.style.transform = this.default_transform
            this.playing = false;
            this.direction = "forwards";
        }
        if (this.playing == true) return;
        if (this.direction != "forwards") return;
        this.playing = true;
        this.playing = true;
        let counter = 0;
        this.forward_interval = window.setInterval(()=>{
            let stretched_animation_function = (counter)=>this.keyframe_from + this.forward_animation_function(counter) * (this.keyframe_to - this.keyframe_from);
            let value = stretched_animation_function(counter / this.forward_duration);
            if (this.animated_css_func) this.element.style[this.animated_css] = this.animated_css_func + "(" + value + this.unit + ")";
            else this.element.style[this.animated_css] = value + this.unit;
            if (counter >= this.forward_duration) {
                window.clearInterval(this.forward_interval);
                //this.element.style.transform = this.default_transform
                this.playing = false;
                this.direction = "backwards";
            }
            counter += 10;
        }, 10);
    }
    checkEvents(scrollYAnchorBottom) {
        let objectPosYAnchorMiddle = u(this.element).size().top + window.scrollY + u(this.element).size().height / 2;
        //let objectPosYAnchorBottom = object.size().top + window.scrollY + object.size().height
        //Ziel: ein art Hyperbel -> Also die forw??rtsanimation startet sobald weiter als zur mitte des Elements gescrolled wird
        // die r??ckw??rts animation started sobald dann wieder h??her gleich der mitte des elements gescrolled wird
        if (scrollYAnchorBottom > objectPosYAnchorMiddle + this.offset) //play forwards
        this.playForwards();
        else if (scrollYAnchorBottom <= objectPosYAnchorMiddle + this.offset) //play backwards
        this.playBackwards();
    }
}




class $8af37d3d6d640fb1$export$34286bc08bf9c80a {
    constructor(element){
        this.element = element;
        //Get Animations via data- attributes
        let [getDataDefault, getDataError] = (0, $c7be1fc6c13f9027$export$70981bf34b85c1b0)(this.element, "animation");
        this.animated_css = getDataError("css");
        this.animated_css_func = getDataDefault("css-func", "");
        this.keyframe_from = getDataError("keyframe-from", true);
        this.keyframe_to = getDataError("keyframe-to", true);
        this.unit = getDataDefault("unit", "");
        this.scroll_duration = getDataError("scroll-duration", true);
        this.animation_function = getDataError("function");
        this.start_offset = getDataDefault("start-offset", 0, true);
        //process attributes
        this.animation_function = (0, $e81a113864fe77bb$export$2e2bcd8739ae039)[this.animation_function];
        //start by setting the animated css value to the "keyframe-from" position
        if (this.animated_css_func) this.element.style[this.animated_css] = this.animated_css_func + "(" + this.keyframe_from + this.unit + ")";
        else this.element.style[this.animated_css] = this.keyframe_from + this.unit;
    }
    checkEvents(scroll) {
        //verticaly stretch animation-function to start at "keyframe-from" and end at "keyframe-to"
        let stretched_animation_function = (counter)=>this.keyframe_from + this.animation_function(counter) * (this.keyframe_to - this.keyframe_from);
        let objectPosYAnchorMiddle = u(this.element).size().top + window.scrollY + u(this.element).size().height / 2;
        let relative_scroll = scroll - objectPosYAnchorMiddle - this.start_offset;
        if (relative_scroll < 0) {
            //start by setting the animated css value to the "keyframe-from" position
            if (this.animated_css_func) this.element.style[this.animated_css] = this.animated_css_func + "(" + this.keyframe_from + this.unit + ")";
            else this.element.style[this.animated_css] = this.keyframe_from + this.unit;
        } else if (relative_scroll < this.scroll_duration) {
            if (this.animated_css_func) this.element.style[this.animated_css] = this.animated_css_func + "(" + stretched_animation_function(relative_scroll / this.scroll_duration) + this.unit + ")";
            else this.element.style[this.animated_css] = stretched_animation_function(relative_scroll / this.scroll_duration) + this.unit;
        } else if (this.animated_css_func) this.element.style[this.animated_css] = this.animated_css_func + "(" + this.keyframe_to + this.unit + ")";
        else this.element.style[this.animated_css] = this.keyframe_to + this.unit;
    }
}


/**
 * Two types of animation:
 *  1) Scroll triggerd animations - animation starts once element is scrolled into view - also undo animation once user scroll back aboth element (see aos library)
 *  2) Scroll controlled animation - move element with scroll of user (see webC website)
 */ let $d3928351bb4a0237$var$scroll_triggered_animations = [];
let $d3928351bb4a0237$var$scroll_controlled_animations = [];
//Init Animations
window.addEventListener("DOMContentLoaded", ()=>{
    //find all objects that need to be animated
    let scroll_triggered_objects = u(".animation.scroll-triggered");
    let scroll_controlled_objects = u(".animation.scroll-controlled");
    //for every object add a animation to the scroll_triggeded_animations variable
    scroll_triggered_objects.each((node)=>{
        $d3928351bb4a0237$var$scroll_triggered_animations.push(new (0, $0a2e60d6efdd78ff$export$f5804c2eff459bff)(node));
    });
    //for every object add a animation to the scroll_controlled_animations variable
    scroll_controlled_objects.each((node)=>{
        $d3928351bb4a0237$var$scroll_controlled_animations.push(new (0, $8af37d3d6d640fb1$export$34286bc08bf9c80a)(node));
    });
    window.requestAnimationFrame($d3928351bb4a0237$var$animation_loop);
});
function $d3928351bb4a0237$var$animation_loop(time) {
    //let documentHeightAnchorBottom = document.body.scrollHeight
    //let documentHeightAnchorTop = document.body.scrollHeight - window.visualViewport.height
    //let scrollYAnchorTop = window.scrollY //offset from the top of the document to the highest visible pixel
    let scrollYAnchorBottom = window.scrollY + window.visualViewport.height //offset from the bottom of the document to the lowest visible pixel
    ;
    $d3928351bb4a0237$var$scroll_triggered_animations.map((animation)=>{
        animation.checkEvents(scrollYAnchorBottom);
    });
    $d3928351bb4a0237$var$scroll_controlled_animations.map((animation)=>{
        animation.checkEvents(scrollYAnchorBottom);
    });
    window.requestAnimationFrame($d3928351bb4a0237$var$animation_loop);
}


