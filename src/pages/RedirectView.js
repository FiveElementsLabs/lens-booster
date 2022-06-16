import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Redirect from '../components/redirect/Redirect';

export default function RedirectView() {
  const { ipfshash } = useParams();

  return (
    <>
      <Redirect ipfshash={ipfshash}>Redirect</Redirect>
    </>
  );
}
