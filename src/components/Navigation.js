    
import React, {Component} from "react";
import './Navigation.css';


export default class Navigation extends Component {
   constructor(props){
        super(props)
        this.state={
            locations:[]
        }
    }


    componentWillMount=()=>{
      this.setState({
        locations: this.props.locations
      })
    }
    // Used for rendering
    getClasses(ctx, index) {
        let classes = `material-icons ${ctx}`;
        if (ctx === 'dots') {
            if (this.isLast(index)) {
                classes += ' hidden';
            }
        } else {
            classes += this.isLast(index) ? ' small' : ' x-small';
            if (index === 0) {
                classes += ' first';
            }
        }
        return classes;
    }


    // Used for rendering
    isLast(index) {
        if(index === this.props.locations.length - 1){
            return true
        }
    }
    isFirst(index) {
        if(index === 0){
            return true
        }
    }


    getIndex(list,item){
      let i=0;
      for(i=0;i<list.length;i++){
        if(list[i]===item){
          return(i)
        }
      }
    }


    moveUp=(index,location)=>{
        console.log(location)
        console.log(index)
      let locationarray=this.state.locations;
      let i=0;
      for(i=0;i<locationarray.length;i++){
        let temp=locationarray[index-1];
        if(i===index){
          locationarray[i]=temp;
          locationarray[i-1]=location;
        }
      }
      this.setState({locations: locationarray})
    }

    moveDown=(index,location)=>{
        console.log(location)
        console.log(index)
      let locationarray=this.state.locations;
      let i=0;
      for(i=0;i<locationarray.length;i++){
        let temp=locationarray[index+1];
        if(i===index){
          locationarray[i]=temp;
          locationarray[i+1]=location;
        }
      }
      this.setState({locations: locationarray})
    }


    listlocations=()=>{
      let locationlist=this.state.locations;
      
      return locationlist.map(location=>{
        return(
          <li key={'row' + this.getIndex(locationlist,location)} data-testid={'location-' + this.getIndex(locationlist,location)}
                                    className="layout-row justify-content-between align-items-center mr-8 pl-40 relative">
                                    <div className="layout-column justify-content-start align-items-center handle">
                                        <i className={this.getClasses('marker', this.getIndex(locationlist,location))}>{this.isLast(this.getIndex(locationlist,location)) ? 'room' : 'radio_button_checked'}</i>
                                        <i className={this.getClasses('dots', this.getIndex(locationlist,location))}>more_vert</i>
                                    </div>
                                    <div className="location-name">
                                        <p className="caption text-start mb-4" data-testid="location">{location}</p>
                                    </div>
                                    <div>
                                        {
                                            !this.isFirst(this.getIndex(locationlist,location))&&
                                            <button className="icon-only small mx-0"  data-testid="up-button" 
                                          onClick={()=>this.moveUp(this.getIndex(locationlist,location),location)}>
                                            <i className="material-icons"  >arrow_upward</i>
                                        </button>
                                        }
                                        {
                                            !this.isLast(this.getIndex(locationlist,location))&&
                                        <button className="icon-only small mx-0" data-testid="down-button"
                                        disabled={this.isLast(this.getIndex(locationlist,location))}
                                        onClick={()=>this.moveDown(this.getIndex(locationlist,location),location)}>
                                            <i className="material-icons">arrow_downward</i>
                                       </button>
                                        }
                                   </div>
                               </li>
                               )})


    }


    render() {
        return (
            <div className="layout-row align-items-center justify-content-center navigation-screen">
                <div className="card layout-row flat map-card">
                    <section className="card pb-16 pr-16 flex-auto layout-column justify-content-center">
                        <ul className="pl-0" data-testid="location-list">
                                {/*Use this li for rendering each location item as it contains all the data-testid attributes required for the tests to pass*/}
                          {this.listlocations()}
                        </ul>
                    </section>
                    <section className="flex-auto">
                        <img src="images/map.svg" className="fill" alt="map"/>
                    </section>
                </div>


            </div>
        );
    }
}
 