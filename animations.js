export class ScrollTriggerdAnimation{
    constructor(duration,animation_function) {
        this.duration = duration;
        this.animation_function = animation_function
        this.playing = false;
    }
    playBackwards(element){

    }
    playForwards(element){
        if(this.playing == true) return
        this.playing = true;

        let counter = 0;

        let default_transform = element.style.transform
        
        let interval = window.setInterval(()=>{

            let value = this.animation_function(counter/this.duration)
            element.style.transform = default_transform + " " + "scale("+value+")"
            if(counter >= this.duration){
                //rest transform
                element.style.transform = default_transform
                window.clearInterval(interval)
                this.playing = false
            }
            counter += 10
        },10)
    }
}