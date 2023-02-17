import { easeOutBounce } from "./animation-functions.js"


export class ScrollTriggeredAnimation{
    constructor(element) {
        this.element = element

        //set antiation options via data attributes
        this.forward_duration = u(element).data("animation-lenght") || 1000;
        this.forward_animation_function = easeOutBounce
        this.backward_duration = u(element).data("animation-lenght") || 1000;
        this.backward_animation_function = easeOutBounce

        //set default values
        this.playing = false;
        this.direction = "forwards";
        this.forward_interval = null;
        this.backward_interval = null;
        this.default_transform = element.style.transform

        //start by setting transform to the end state of the backwards animation
        let value = this.backward_animation_function(0)
        this.element.style.transform = this.default_transform + " " + "scale("+value+")"
    }
    playBackwards(snap){
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
            let value = this.backward_animation_function(counter/this.backward_duration)

            this.element.style.transform = this.default_transform + " " + "scale("+value+")"

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
            let value = this.forward_animation_function(counter/this.forward_duration)

            this.element.style.transform = this.default_transform + " " + "scale("+value+")"

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