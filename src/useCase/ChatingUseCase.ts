import IChatingRepositories from "../interface/repositories/IChatingRepositories";
import IChatingUseCase from "../interface/useCase/IChatingUseCase";


export default class ChatingUseCase implements IChatingUseCase {

    private chatingRepositories:IChatingRepositories
    constructor(chatingRepositories:IChatingRepositories){
        this.chatingRepositories=chatingRepositories
    }



    

}