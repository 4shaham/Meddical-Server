import IChatingContrller from "../../interface/controler/IChatingContrller";
import IChatingUseCase from "../../interface/useCase/IChatingUseCase";


export default class ChatingControllers implements IChatingContrller {
     
    private chatingUseCase:IChatingUseCase
    constructor(chatingUseCase:IChatingUseCase){
        this.chatingUseCase=chatingUseCase
    }
     
    

}