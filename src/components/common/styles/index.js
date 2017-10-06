import styled from 'styled-components'; 

export const AppWrapper = styled.div`
  text-align: center;
  height: 100%;
`;

export const AppHeader = styled.div`
  font-family: 'Varela Round', sans-serif;
  background-color: #5E376C;
  z-index: 5;
  top:0;
  width:100%;
  height: 120px;
  padding-top: 20px;
  color: white;
`;

export const AppBody = styled.div`
  width: 100%;
  overflow: auto; 
  height: 100%; 

  /* Background pattern from Subtle Patterns <https://www.toptal.com/designers/subtlepatterns/> */
  background: linear-gradient(rgba(224, 223, 229, 0.55), rgba(224, 223, 229, 0.55)),
  rgba(224,223,229,0.55) url('/assets/img/restaurant_icons.png');
  background-size:contain;
`;

export const SpinnerWrapper = styled.div`
  /* Adapt spinner based on hide prop */
  font-weight:bold;
  margin:32px;
  display: ${(props) => props.hide ? 'none' : 'flex'};
  flex-direction: column;
  justify-content: center;
  align-items: center
`;

export const NavBar = styled.div`
  align-items: center;
  height: 50px; 
  background-color:#49334F;
  padding: 12px;
  padding-top: 14px;
  z-index: 1;
`;

export const NavButton = styled.span`
  display: ${(props) => props.hide ? 'none' : 'inline'};
  cursor: pointer;
  margin:4px;
  padding:6px;
  font-size: 0.9em;
  border: 1.5px solid #FFC801;
  color: #FFC801;
  border-radius: 25px;
  background-color:#5E376C;
  transition: 0.3s;
  &:hover {
    background-color:#FFC801;
    color: #fff;
    border: 1.5px solid #fff;
  }
`;

export const Card = styled.div`
  min-height: ${(props) => props.height ? props.height : '90px'};
  padding: 8px; 
  margin: 8px;
  font-weight: 400;

  flex-direction: column;
  justify-content: center;
  align-items: center
  overflow: visible;

  border-radius: 4px;
  color: ${(props) => props.color ? props.color : '#222'};
  background-color: ${(props) => props.backgroundColor ? props.backgroundColor : '#fff'};
  
  box-shadow: 0 4px 8px 0  rgba(46, 61, 73, 0.2);
  transition: 0.3s;
}
`;

export const Anchor = styled.span`
  cursor: pointer;
  color: ${(props) => props.color ? props.color : '#222'};
  font-weight:bold;
  text-decoration: underline;
  &:hover{
    color: ${(props) => props.color ? props.color : '#fff'};
  }
}
`;