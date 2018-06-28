import React from 'react';

export default function ConfirmationQuestions(props){
  return(
    <div>
      <p>Have you gone through all the steps on the learn how to program debugging lesson?</p>
      <button onClick={props.onTroubleshootingConfirmation}>Yes</button>
    </div>
  )
}
