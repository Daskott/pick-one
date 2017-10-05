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
  height: 170px;
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
  margin-top:16px;
  height: 50px; 
  background-color:#49334F;
  padding: 12px;
  padding-top: 14px;
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
