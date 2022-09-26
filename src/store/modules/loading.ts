import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface ILoadingState {
   loading:boolean
  }


@Module({dynamic: true, store, name: 'loading' })
class Loading extends VuexModule implements ILoadingState{
    public loading: boolean=false

    @Mutation
    public INVERT_LOADING() {
      this.loading = !this.loading
    }
    @Action 
    public InvertLoading(){
        this.INVERT_LOADING()
    }
  
}
  
export const LoadingModule = getModule(Loading)