import api from "services/api";

class NgCashModel {
    folder = "";
    api = api;
    constructor() {
       this.api = api;
    }

    async list(params:any) {
        const ret = await this.api.get(this.folder, params);
       return this.getData(ret);
     }
  
     async get(hash:any) {
        const ret = await this.api.get(this.folder + hash);
        return this.getData(ret);
     }
  
     post(obj:any, params:any) {
        return this.api.post(this.folder, obj).then(this.getData);
     }
  
     patch(id:number, params:any) {
        return this.api.patch(this.folder + "/" + id, params).then(this.getData);
     }
  
     update(obj:any, params:any) {
        return this.api.patch(this.folder, obj).then(this.getData);
     }
  
     getData(ret:any) {
        return ret.data;
     }
     
     delete(params:any) {
        return this.api.delete(this.folder, params).then(this.getData);
     }
}

export default NgCashModel;