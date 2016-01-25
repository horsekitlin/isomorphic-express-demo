import constants from './constants';
import Flux from 'flux';

class Dispatcher extends Flux.Dispatcher {
    constructor(){
        super();
    }
    handleTagsAction(action){
        var payload = {
            source: 'Tags',
            action: action
        };
        this.dispatch(payload);
    }
    handleUsersAction(action){
        var payload = {
            source: 'Users',
            action: action
        };
        this.dispatch(payload);
    }
    handlePostsAction(action){
        var payload = {
            source: 'Posts',
            action: action
        };
        this.dispatch(payload);
    }
    handleFansAction(action){
        var payload = {
            source: 'Posts',
            action: action
        };
        this.dispatch(payload);
    }
    handleRoutesAction(action){
        var payload = {
            source: 'Route',
            action: action
        };
        this.dispatch(payload);
    }
    handleViewsAction(action){
        var payload = {
            source: 'Views',
            action: action
        };
        this.dispatch(payload);
    }
}
var AppDispatcher = new Dispatcher();

export default AppDispatcher;

