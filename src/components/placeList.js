import React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import { Card } from '../components/common/styles'

function Image(props){
    return (
        <div className="image-wrapper">
            <img src={props.url} alt={props.alt} className="place-Image"/>
        </div>
    )
}
class Place extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            flipCard: false
        }
    }

    componentDidMount(){
        this.setState({flipCard: this.props.flipCard});
    }

    componentWillReceiveProps(nextProps){
        this.setState({flipCard: nextProps.flipCard});
    }

    handleFlipCard = () => {
        this.setState({flipCard: !this.state.flipCard});
    }

    render() {
        const { place } = this.props;
        const photos = place.photos;
        const iconUrl = photos ? photos[0].getUrl({'maxWidth': 70, 'maxHeight': 70}): place.icon;
        let hoursElement = null;

        if (place.opening_hours) { 
            const isOpen = place.opening_hours ? place.opening_hours.open_now : null;
            hoursElement = <span className={`place-item bold ${isOpen? 'green': 'red'}`}>{ isOpen ? 'Open' : 'Closed' }</span>;
        }
        const flipClass = this.state.flipCard ? ' flip' : '';
 
        return (
            <div className={`flip-container place-container${flipClass}`} onClick={this.handleFlipCard}>
                <div className="flipper">
                    <Card className="front place">
                        <span className="pull-right label label-default">{String(this.props.place.rating).length < 3? `${place.rating}.0`: place.rating}</span>
                        <Image url={iconUrl} alt={this.props.place.name}/>
                        <span className="place-item place-name">{this.props.place.name}</span>
                        <span className="place-item place-address">{this.props.place.vicinity}</span>
                        { hoursElement }
                    </Card>
                    <Card className="back place">
                        {/** **/}
                    </Card>
                </div>
            </div>
        )
    }
}

function PlaceList(props){
    const places = props.places.map((place) => ( 
        <CSSTransition
            key={place.id} 
            classNames="slide"
            timeout={{ enter: 500, exit: 300 }}>
            <Place place={place} flipCard={props.flipCards}/> 
        </CSSTransition>
    ));

    return (
        <div className="place-list">
            <TransitionGroup component="div"> 
                {places}
            </TransitionGroup>
        </div>
    )
}

export default PlaceList;