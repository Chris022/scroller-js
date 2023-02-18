import animation_functions from "./animation-functions.js"
import {DataStorrage} from "./helpers.js"

export class ScrollControlledAnimation{
    constructor(element) {
        this.element = element

        //Get Animations via data- attributes
        let [getDataDefault,getDataError] = DataStorrage(this.element,"animation")

        this.animated_transform = getDataError("transform")
        this.keyframe_from      = getDataError("keyframe-from")
        this.keyframe_to        = getDataError("keyframe-to");
        this.unit               = getDataDefault("unit","");
        this.scroll_duration    = getDataError("scroll-length");
        this.animation_function = getDataError("function")

        this.start_offset       = getDataDefault("start-offset", 0);

        //process attributes
        this.animation_function = animation_functions[this.animation_function]

        //set default values
        this.default_transform = element.style.transform
    }
    checkEvents(scroll){

        //verticaly stretch animation-function to start at "keyframe-from" and end at "keyframe-to"
        let stretched_animation_function = (counter)=>(this.keyframe_from + this.animation_function(counter) * (this.keyframe_to-this.keyframe_from))
        
        let objectPosYAnchorMiddle = u(this.element).size().top + window.scrollY +  u(this.element).size().height/2
        
        let relative_scroll = scroll - objectPosYAnchorMiddle - this.start_offset

        if(relative_scroll < 0){
            this.element.style.transform = this.default_transform + " " + this.animated_transform+"("+this.keyframe_from+this.unit+")";
        }else if(relative_scroll < this.scroll_duration){
            this.element.style.transform = this.default_transform + " " + this.animated_transform+"("+stretched_animation_function(relative_scroll/this.scroll_duration)+this.unit+")";
        }else{
            this.element.style.transform = this.default_transform + " " + this.animated_transform+"("+this.keyframe_to+this.unit+")";
        }
        
    }
}