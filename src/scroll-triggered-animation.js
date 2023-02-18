import animation_functions from "./animation-functions.js"
import {DataStorrage} from "./helpers.js"


export class ScrollTriggeredAnimation{
    constructor(element) {


        this.element = element

        //Get Animations via data- attributes
        let [getDataDefault,getDataError] = DataStorrage(this.element,"animation")

        this.animated_transform = getDataError("transform")
        this.keyframe_from      = getDataError("keyframe-from")
        this.keyframe_to        = getDataError("keyframe-to");
        this.unit               = getDataDefault("unit","");

        this.forward_duration           = getDataError("forward-duration")
        this.forward_animation_function = getDataError("forward-function")

        this.backward_duration          = getDataDefault("backward-duration",this.forward_duration);
        this.backward_animation_function= getDataDefault("backward-function",this.forward_animation_function);

        //process attributes
        this.forward_animation_function = animation_functions[this.forward_animation_function]

        this.backward_animation_function= animation_functions[this.backward_animation_function]

        //set default values
        this.playing = false;
        this.direction = "forwards";
        this.forward_interval = null;
        this.backward_interval = null;
        this.default_transform = element.style.transform


        //start by setting transform to the "keyframe-from" position
        this.element.style.transform = this.default_transform + " " + this.animated_transform +"("+this.keyframe_from+this.unit+")"
    }
    playBackwards(){
        if(this.direction == "forwards" && this.playing == true){//if forwards animation is playing -> interrupt it
            window.clearInterval(this.forward_interval)
            //this.element.style.transform = this.default_transform
            this.playing = false;
            this.direction = "backwards"
        }
        
        if(this.playing == true) return
        if(this.direction != "backwards") return

        this.playing = true;

        let counter = this.backward_duration;
        
        this.backward_interval = window.setInterval(()=>{
            let stretched_animation_function = (counter)=>(this.keyframe_from + this.backward_animation_function(counter) * (this.keyframe_to-this.keyframe_from))
            let value = stretched_animation_function(counter/this.backward_duration)

            this.element.style.transform = this.default_transform + " " + this.animated_transform + "("+value+this.unit+")"

            if(counter <= 0){
                window.clearInterval(this.backward_interval)
                //this.element.style.transform = this.default_transform
                this.playing = false
                this.direction = "forwards"
            }

            counter -= 10
        },10)
    }
    playForwards(){
        if(this.direction == "backwards" && this.playing == true){//if backwards animation is playing -> interrupt it
            window.clearInterval(this.backward_interval)
            //this.element.style.transform = this.default_transform
            this.playing = false;
            this.direction = "forwards"
        }
        
        if(this.playing == true) return
        if(this.direction != "forwards") return
        
        this.playing = true;
        this.playing = true;

        let counter = 0;

        this.forward_interval = window.setInterval(()=>{
            let stretched_animation_function = (counter)=>(this.keyframe_from + this.forward_animation_function(counter) * (this.keyframe_to-this.keyframe_from))
            let value = stretched_animation_function(counter/this.forward_duration)

            this.element.style.transform = this.default_transform + " " + this.animated_transform + "("+value+this.unit+")"

            if(counter >= this.forward_duration){
                window.clearInterval(this.forward_interval)
                //this.element.style.transform = this.default_transform
                this.playing = false
                this.direction = "backwards"
            }
            
            counter += 10
        },10)
    }
    checkEvents(scrollYAnchorBottom){
        let objectPosYAnchorMiddle = u(this.element).size().top + window.scrollY +  u(this.element).size().height/2
        //let objectPosYAnchorBottom = object.size().top + window.scrollY + object.size().height


        //Ziel: ein art Hyperbel -> Also die forwärtsanimation startet sobald weiter als zur mitte des Elements gescrolled wird
        // die rückwärts animation started sobald dann wieder höher gleich der mitte des elements gescrolled wird
        
        if(scrollYAnchorBottom > objectPosYAnchorMiddle){
            //play forwards
            this.playForwards()
        }else if(scrollYAnchorBottom <= objectPosYAnchorMiddle){
            //play backwards
            this.playBackwards()
        }
    }
}