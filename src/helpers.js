export function DataStorrage(element,slug){
    return [
        (name,default_val)=>u(element).data(slug+"-"+name) || default_val,
        (name)=>{
            if(!u(element).data(slug+"-"+name))throw new Error("Animation Object missing data attribute: " + slug + "-" + name)
            return u(element).data(slug+"-"+name)
        }
    ]

}