import React from 'react';
import Feed from '../components/layout/Feed.js';
import Hero from '../components/layout/Hero.js';
import Dashboard from '../components/Inflenser/Dashboard.js';
import Campaigns from '../components/Inflenser/Campaigns.js';

export default function Inflenser(props) {
  return (
    <>
      <Dashboard />
      <Campaigns />
    </>
  );
}
