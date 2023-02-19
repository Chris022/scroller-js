import animation_functions from "./animation-functions.js"
import {DataStorrage} from "./helpers.js"

export class ScrollControlledAnimation{
    constructor(element) {
        this.element = element

        //Get Animations via data- attributes
        let [getDataDefault,getDataError] = DataStorrage(this.element,"animation")

        this.animated_css       = getDataError("css")
        this.animated_css_func  = getDataDefault("css-func","")
        this.keyframe_from      = getDataError("keyframe-from",true)
        this.keyframe_to        = getDataError("keyframe-to",true);
        this.unit               = getDataDefault("unit","");
        this.scroll_duration    = getDataError("scroll-duration",true);
        this.animation_function = getDataError("function")

        this.start_offset       = getDataDefault("start-offset", 0,true);

        //process attributes
        this.animation_function = animation_functions[this.animation_function]

        //start by setting the animated css value to the "keyframe-from" position
        if(this.animated_css_func){
            this.element.style[this.animated_css] = this.animated_css_func +"("+this.keyframe_from+this.unit+")"
        }else{
            this.element.style[this.animated_css] = this.keyframe_from+this.unit
        }
    }
    checkEvents(scroll){

        //verticaly stretch animation-function to start at "keyframe-from" and end at "keyframe-to"
        let stretched_animation_function = (counter)=>(this.keyframe_from + this.animation_function(counter) * (this.keyframe_to-this.keyframe_from))
        
        let objectPosYAnchorMiddle = u(this.element).size().top + window.scrollY +  u(this.element).size().height/2
        
        let relative_scroll = scroll - objectPosYAnchorMiddle - this.start_offset
        if(relative_scroll < 0){
            //start by setting the animated css value to the "keyframe-from" position
            if(this.animated_css_func){
                this.element.style[this.animated_css] = this.animated_css_func +"("+this.keyframe_from+this.unit+")"
            }else{
                this.element.style[this.animated_css] = this.keyframe_from+this.unit
            }
        }else if(relative_scroll < this.scroll_duration){
            if(this.animated_css_func){
                this.element.style[this.animated_css] = this.animated_css_func +"("+stretched_animation_function(relative_scroll/this.scroll_duration)+this.unit+")"
            }else{
                this.element.style[this.animated_css] = stretched_animation_function(relative_scroll/this.scroll_duration)+this.unit
            }
        }else{
            if(this.animated_css_func){
                this.element.style[this.animated_css] = this.animated_css_func +"("+this.keyframe_to+this.unit+")"
            }else{
                this.element.style[this.animated_css] = this.keyframe_to+this.unit
            }
        }   
    }
}