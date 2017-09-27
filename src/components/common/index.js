import styled from 'styled-components'; 

export const SpinnerWrapper = styled.div`
    /* Adapt spinner based on hide prop */
    margin:32px;
    display: ${(props) => props.hide ? 'none' : 'flex'};
    flex-direction: column;
    justify-content: center;
    align-items: center
  `;

  export const PlaceListHeader = styled.div`
    z-index:5;
    padding:8px;
    align-items: center
    min-height: 30px; 
    margin: 8px;
    border-radius: 4px;
    color: #fff;
    background-color: #FCC04F; 
    font-weight: 400;
  `;