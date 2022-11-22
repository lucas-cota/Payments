import NgCashModel from "services/api-model";

class LoadNg extends NgCashModel {
    constructor() {
        super()
    }

    getNg(url:any) {
        return this.api.get(url).then(this.getData)
    }

    delNg(url:any, id:any){
    return this.api.delete(url, id).then(this.getData)
    }

    
    addNg(url:any, obj:any) {
    return this.api.post(url, obj).then(this.getData)
    }

    //update lesson
    patchNg(url:any, params:any) {
    return this.api.patch(url, params).then(this.getData)
    }

    //get lesson by account
    getByAccount(url:any, params:any){
    return this.api.get(url, params).then(this.getData)
    } 
}

export default LoadNg