import styled from 'styled-components'; 

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
  &:hover {
    background-color:#FFC801;
    color: #fff;
    border: 1.5px solid #fff;
  }
`;
