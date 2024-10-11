export class baseCalss{
    constructor(){

    }
     // 销毁
     destroy(){
        for (const key in this) {
            (this[key] as any) = undefined;
        }
     }
     reload(data:any){
        for (const key in data) {
            if(data[key]){
                (this[key] as any) = data[key];
            }
        }
        return this
     }
}