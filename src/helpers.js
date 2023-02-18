export function DataStorrage(element,slug){
    return [
        (name,default_val,numeric=false)=>(numeric?parseFloat(u(element).data(slug+"-"+name)):u(element).data(slug+"-"+name)) || default_val,
        (name,numeric=false)=>{
            if(!u(element).data(slug+"-"+name))throw new Error("Animation Object missing data attribute: " + slug + "-" + name)
            if(numeric) return parseFloat(u(element).data(slug+"-"+name))
            return u(element).data(slug+"-"+name)
        }
    ]

}