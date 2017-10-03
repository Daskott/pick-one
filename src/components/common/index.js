import styled from 'styled-components'; 

export const SpinnerWrapper = styled.div`
    /* Adapt spinner based on hide prop */
    margin:32px;
    display: ${(props) => props.hide ? 'none' : 'flex'};
    flex-direction: column;
    justify-content: center;
    align-items: center
  `;

export const NavButton = styled.span`
  cursor: pointer;
  margin:8px;
  padding:8px;
  border: 2px solid #FCC04F;
  color: #FCC04F;
  border-radius: 4px;
  &:hover {
    background-color:#FCC04F;
    color: #fff;
    border: 2px solid #fff;
  }
`;
